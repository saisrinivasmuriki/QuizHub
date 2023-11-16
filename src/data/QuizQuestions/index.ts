// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

type Choice = string
type CorrectAnswers = string[]

export type Question = {
  question: string
  choices: Choice[]
  isMulti: boolean
  correctAnswers: CorrectAnswers
  score: number
  code?: string
  image?: string
  user?: string
}

export type Topic = {
  topic: string
  level: string
  totalQuestions: number
  totalScore: number
  totalTime: number
  questions: Question[]
}

const initalQuiz: Topic = {
  topic: 'default',
  level: 'Beginner',
  totalQuestions: 0,
  totalScore: 0,
  totalTime: 0,
  questions: [],
}

export const quiz: Record<string, Topic> = {
  default: initalQuiz,
}
