import type { Meta, StoryObj } from '@storybook/react'
import QuestionScreen from '.'

const meta = {
  title: 'Page/QuestionScreen',
  component: QuestionScreen,
} satisfies Meta<typeof QuestionScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
