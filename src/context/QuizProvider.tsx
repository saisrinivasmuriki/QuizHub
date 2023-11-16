import { ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Question, quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes } from '../types'
import { QuizContext, initialState } from './QuizContext'
import * as io from 'socket.io-client'
import { checkQuestionIncludes } from '../styles/Global'
import { useNavigate } from 'react-router-dom'

export const socket = io.connect('http://localhost:4000')

type QuizProviderProps = {
  children: ReactNode
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [timer, setTimer] = useState<number>(initialState.timer)
  const [endTime, setEndTime] = useState<number>(initialState.endTime)
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )
  const [questions, setQuestions] = useState<Question[]>([])
  const [roomDetails, setRoomDetails] = useState(initialState.roomDetails)

  const {
    questions: quizQuestions,
    totalQuestions,
    totalTime,
    totalScore,
  } = quiz[quizTopic]

  useEffect(() => {
    console.log('questions changed', questions)
  }, [questions])

  const selectQuizTopic = (topic: string) => {
    setQuizTopic(topic)
  }

  const listenQuestion = () => {
    socket.on('recieve_question', (data) => {
      console.log('recieve_question at ', new Date().getTime(), ' :', data)
      if (questions.indexOf(data) === -1) {
        setQuestions([...questions, data])
      }
    })
  }

  const gptQuestions = () => {
    socket.on('gpt_questions', (data: Question[]) => {
      setQuestions([...questions, ...data])
    })
  }

  useEffect(() => {
    listenQuestion()
    gptQuestions()
  }, [socket, listenQuestion, gptQuestions])

  useEffect(() => {
    // setTimer(totalTime)
    setQuestions(quizQuestions)
    // joinRoom('hello-world')
  }, [quizTopic, quizQuestions])

  const addQuestion = (question: Question) => {
    const filters = checkQuestionIncludes(questions, question)
    console.log(roomDetails)
    if (!(filters.length !== 0)) {
      socket.emit('send_question', {
        room: roomDetails.room,
        question,
      })
      setQuestions([...questions, question])
      setResult([
        ...result,
        { ...question, selectedAnswer: question.correctAnswers, isMatch: true },
      ])
    }
  }

  const navigate = useNavigate()

  const createRoom = (roomNumber: string, QFromGPT: boolean, title: string) => {
    setRoomDetails({ room: roomNumber, QFromGPT, title, created: true })
    socket.emit(
      'create_room',
      {
        room: roomNumber,
        QFromGPT: QFromGPT,
        title: title,
      },
      (response: any) => {
        if (response) {
          navigate('/room')
        } else {
          alert('There Might be same room going please try changing room title.')
        }
      }
    )
  }

  const joinRoom = (roomNumber: string) => {
    socket.emit('join_room', roomNumber, (response: any) => {
      console.log(response)
      if (response.error) {
        alert(response.message)
      } else {
        navigate('/room')
        setQuestions(response.data.questions)
        const det = response.data
        delete det.questions
        console.log(det)
        setRoomDetails(det)
      }
    })
  }

  const getGptQuestions = () => {
    socket.emit('get_gpt_questions', roomDetails, (response: any) => {
      setQuestions(response)
    })
  }

  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic: quizTopic,
  }

  const quizContextValue: QuizContextTypes = {
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
    roomDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
    addQuestion,
    joinRoom,
    createRoom,
    getGptQuestions,
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
