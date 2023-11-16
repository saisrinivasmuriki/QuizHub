import type { Meta, StoryObj } from '@storybook/react'
import MenuBox from '.'
import { Message } from '../../../config/icons'

const meta = {
  title: 'Molecules/MenuBox',
  component: MenuBox,
} satisfies Meta<typeof MenuBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    icons: [<Message />],
  },
}
