import React from 'react'
import styled from 'styled-components'
import { device } from '../../../styles/BreakPoints'
import { UserDiv } from '../../../styles/Global'

interface MessageBoxProps {
  userName: string
  message: string
}

const MessageContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 30%;
  @media ${device.sm} {
    max-width: 100%;
  }
  border: 1px solid ${({ theme }) => theme.colors.primaryText};
  padding: 0px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.cardBackground};
`

const StyledMessage = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
`

const MessageBox = (props: MessageBoxProps) => {
  const { userName, message } = props
  return (
    <MessageContainer>
      <UserDiv response="UnAnswered">{userName}</UserDiv>
      <StyledMessage>{message}</StyledMessage>
    </MessageContainer>
  )
}

export default MessageBox
