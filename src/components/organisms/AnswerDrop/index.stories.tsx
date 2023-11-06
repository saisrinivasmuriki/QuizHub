import type { Meta, StoryObj } from '@storybook/react'
import AnswerDrop from '.'

const meta = {
  title: 'Organisms/AnswerDrop',
  component: AnswerDrop,
  argTypes: {
    handleAnswerSelection: {
      action: 'change',
    },
  },
} satisfies Meta<typeof AnswerDrop>

export default meta
type Story = StoryObj<typeof meta>

const stringV =
  'the original words and form of a written or printed work(2): an edited or emended copy of an original workb: a work containing such textthe original words and form of a written or printed work(2): an edited or emended copy of an original workb: a work containing such textthe original words and form of a written or printed work(2): an edited or emended copy of an original workb: a work containing such text'

const stringV1 = `A text editor for Chrome OS and Chrome.
  Text.app is a simple text editor for Chrome OS and Chrome. It's fast, lets you open multiple files at once, has syntax highlighting, and saves to Google Drive on Chrome OS.
  
  File bugs:
  https://github.com/GoogleChrome/text-app/issues
  `
const stringV2 = `We believe that communication belongs to everyone—it should be as free and flexible as we all are.
  Do more in your chats with just a tap
Take the effort out of responding with suggested text and emoji replies, and check off little to-dos, like adding an event to your calendar or confirming the weather, without ever leaving the conversation.
Do more in your chats with just a tap
Take the effort out of responding with suggested text and emoji replies, and check off little to-dos, like adding an event to your calendar or confirming the weather, without ever leaving the conversation.`
const colourOptions = [stringV, stringV1, stringV2]

export const Primary: Story = {
  args: {
    isMulti: true,
    options: colourOptions,
  },
}
