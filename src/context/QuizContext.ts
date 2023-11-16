import { createContext, useContext } from 'react'
import { QuizContextTypes, ScreenTypes } from '../types'
import { Question } from '../data/QuizQuestions'

export const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: 'default',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: 'React',
  },
  roomDetails: {
    room: '',
    QFromGPT: false,
    title: '',
    created: false,
  },
  addQuestion: (question: Question) => {},
  joinRoom: (roomNumber: string) => {},
  createRoom: (roomNumber: string, QFromGpt: boolean, title: string) => {},
  getGptQuestions: () => {},
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}
