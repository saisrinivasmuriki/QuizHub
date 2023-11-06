import type { Meta, StoryObj } from '@storybook/react'
import Textarea from '.'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    onChange: {
      action: 'change',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: 'Enter your Question???',
  },
}
