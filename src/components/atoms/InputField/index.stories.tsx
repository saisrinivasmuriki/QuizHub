import type { Meta, StoryObj } from '@storybook/react'
import InputField from '.'
import * as icons from '../../../config/icons'

const meta = {
  title: 'Atoms/InputField',
  component: InputField,
  argTypes: {
    onChange: { action: 'change' },
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter Your name',
  },
}

export const PrimaryWithIcons: Story = {
  args: {
    type: 'text',
    icons: {
      left: <icons.Refresh />,
      right: <icons.Refresh />,
    },
    placeholder: 'Enter Your name',
  },
}

export const PasswordField: Story = {
  args: {
    type: 'text',
    icons: {
      left: <icons.PasswordIcon />,
      right: <icons.EyeShow />,
    },
    placeholder: 'Enter Your name',
  },
}
