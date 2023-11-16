import { ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Question, quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes } from '../types'
import { QuizContext, initialState } from './QuizContext'
import * as io from 'socket.io-client'
import { checkQuestionIncludes } from '../styles/Global'
import { useNavigate } from 'react-router-dom'
import { getQuestionsFromGPT } from '../utils/gptHelper'
import { Message } from 'react-chat-ui'
import { getAuth } from 'firebase/auth'

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
  const [gotFromGpt, setGotFromGpt] = useState(initialState.gotFromGpt)
  const [loading, setLoading] = useState(initialState.loading)
  const [socketMsg, setSocketMsg] = useState(initialState.socketMsg)
  const [userName, setUserName] = useState(initialState.userName)

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

  const listenMsg = () => {
    socket.on('recieve_msg', (data) => {
      console.log(data.senderName, userName, data.senderName !== userName)
      if (data.senderName !== userName) {
        setSocketMsg([...socketMsg, data])
      }
    })
  }

  useEffect(() => {
    listenQuestion()
    gptQuestions()
    listenMsg()
  }, [socket, listenQuestion, gptQuestions, listenMsg])

  useEffect(() => {
    setQuestions(quizQuestions)
  }, [quizTopic, quizQuestions])

  const addQuestion = (question: Question) => {
    const filters = checkQuestionIncludes(questions, question)
    console.log(roomDetails)
    if (!(filters.length !== 0)) {
      socket.emit('send_question', {
        room: roomDetails.room,
        question,
      })
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
    socket.emit(
      'create_room',
      {
        room: roomNumber,
        join: true,
      },
      (response: any) => {
        if (response.res) {
          console.log(response)
          setRoomDetails({
            ...roomDetails,
            room: response.room,
            QFromGPT: response.QFromGPT,
            title: response.title,
          })
          setQuestions([...questions, ...response.questions])
          navigate('/room')
        } else {
          alert('There Might be same room going please try changing room title.')
        }
      }
    )
  }

  const sendMsg = (msg: Message) => {
    console.log(msg)
    socket.emit('send_msg', {
      room: roomDetails.room,
      message: msg,
    })
    setSocketMsg([...socketMsg, msg])
  }

  const getGptQuestions = () => {
    setLoading(true)
    console.log('In QuizProivder')
    const prompt =
      `give me 10 questions in JSON format and I don't need any other text except the array, JSON object should contain  {question: string
          choices: string[],
          isMulti: boolean, // isMulti is a boolean, if true user can choose multiple option, else only one option
          correctAnswers: string[],
          score: number,
          code?: string,
          image?: string,
          user: 'chatGPT',
         }. The topic is the ` + roomDetails.title
    getQuestionsFromGPT(prompt).then((result) => {
      console.log(result.choices[0].message.content)
      const gptQuestions = JSON.parse(result.choices[0].message.content)
      gptQuestions.map((ques: Question) => {
        if (checkQuestionIncludes(questions, ques).length === 0) {
          setQuestions([...questions, ques])
        }
      })
      setGotFromGpt(true)
      socket.emit('get_gpt_questions', {
        room: roomDetails.room,
        gptQuestions,
      })
      setLoading(false)
      // rooms[data.room] = { ...rooms[data.room], questions: gptQuestions }
      // socket.broadcast.to(data.room).emit('gpt_questions', gptQuestions)
      // callback(gptQuestions)
    })
    // socket.emit('get_gpt_questions', roomDetails, (response: any) => {
    //   setQuestions(response)
    // })
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
    gotFromGpt,
    loading,
    socketMsg,
    userName,
    setUserName,
    sendMsg,
    setEndTime,
    addQuestion,
    joinRoom,
    createRoom,
    getGptQuestions,
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
