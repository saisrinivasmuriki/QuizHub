import type { Meta, StoryObj } from '@storybook/react'
import MessageBox from '.'

const meta = {
  title: 'Molecules/MessageBox',
  component: MessageBox,
} satisfies Meta<typeof MessageBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    userName: 'User 1',
    message:
      "Hello Guys, This Quiz Room meant for the 'Specific' topic, I hope Everyone will learn and enjoy here. Thanks ",
  },
}
