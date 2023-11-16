import { Dispatch, SetStateAction } from 'react'
import { Question } from '../data/QuizQuestions'
import { Message } from 'react-chat-ui'

export enum ScreenTypes {
  SplashScreen,
  QuizTopicsScreen,
  QuizDetailsScreen,
  QuestionScreen,
  ResultScreen,
}

export type answerResponseType = 'UnAnswered' | 'NotApplicable' | 'Correct' | 'Wrong'

export interface Result extends Question {
  selectedAnswer: string[]
  isMatch: boolean
}

export type QuizContextTypes = {
  currentScreen: ScreenTypes
  setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
  quizTopic: string
  selectQuizTopic: (type: string) => void
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<any[]>>
  result: Result[]
  setResult: Dispatch<SetStateAction<any[]>>
  timer: number
  setTimer: Dispatch<SetStateAction<number>>
  endTime: number
  setEndTime: (type: number) => void
  quizDetails: {
    totalQuestions: number
    totalScore: number
    totalTime: number
    selectedQuizTopic: string
  }
  roomDetails: {
    room: string
    QFromGPT: boolean
    title: string
    created: boolean
  }
  gotFromGpt: boolean
  loading: boolean
  socketMsg: Message[]
  userName: string
  setUserName: Dispatch<SetStateAction<string>>
  sendMsg: (msg: Message) => void
  addQuestion: (question: Question) => void
  joinRoom: (roomNumber: string) => void
  createRoom: (roomNumber: string, QFromGpt: boolean, title: string) => void
  getGptQuestions: () => void
}
