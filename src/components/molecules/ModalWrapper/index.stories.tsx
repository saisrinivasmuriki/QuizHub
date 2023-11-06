import type { Meta, StoryObj } from '@storybook/react'
import ModalWrapper from '.'
import * as icons from '../../../config/icons'
import { LogoContainer } from '../../../styles/Global'

const meta = {
  title: 'Molecules/ModalWrapper',
  component: ModalWrapper,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof ModalWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWrapperStory: Story = {
  args: {
    title: 'Heading',
    subtitle: 'Subtitle line',
    icon: (
      <LogoContainer>
        <icons.AppLogo />
      </LogoContainer>
    ),
    buttonTitle: 'Next',
  },
}

// export const IconButton: Story = {
//   args: {
//     text: 'Icon Button',
//     icon: <icons.Refresh />,
//     iconPosition: 'right',
//   },
// }
