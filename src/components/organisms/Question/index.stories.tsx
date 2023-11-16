import type { Meta, StoryObj } from '@storybook/react'
import Question from '.'

// question: string
// code?: string
// image?: string
// type: string
// choices: string[]
// selectedAnswer: string[]
// handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void

const meta = {
  title: 'Organisms/Question',
  component: Question,
  // argTypes: {
  //   handleAnswerSelection: {
  //     action: 'change',
  //   },
  // },
} satisfies Meta<typeof Question>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    question: 'What is the Question?',
    userName: 'User 1',
    // code?: string
    // image?: string
    isMulti: true,
    choices: ['Answer1', 'Answer2', 'Answer3', 'Answer4'],
    correctAnswers: ['Answer1'],
  },
}
