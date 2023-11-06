import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'
import * as icons from '../../../config/icons'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    outline: { control: 'boolean' },
    bold: { control: 'boolean' },
    big: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Primary',
  },
}

export const IconButton: Story = {
  args: {
    text: 'Icon Button',
    icon: <icons.Refresh />,
    iconPosition: 'right',
  },
}
