import styled from 'styled-components'

import { AppLogo } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
// import { quizTopics } from '../../../data/quizTopics'
import { device } from '../../../styles/BreakPoints'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../../styles/Global'
import { ScreenTypes } from '../../../types'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import Button from '../../atoms/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Google } from '../../../config/icons'

export const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`

interface SelectButtonProps {
  active: boolean
  disabled?: boolean
}

const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.disabledCard}` : `${theme.colors.selectTopicBg}`};
  border: ${({ active, theme }) =>
    active
      ? `2px solid ${theme.colors.themeColor}`
      : `1px solid ${theme.colors.disabledButton}`};
  transition: background-color 0.4s ease-out;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: 10px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
`

const SelectButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-size: 16px;
    font-weight: 500;
  }
`

const StyledHr = styled.hr`
  width: 85%;
  margin: 23px 0px;
`

const BorderImage = styled.img`
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
`

const QuizTopicsScreen: React.FC = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const { setUserName } = useQuiz()

  const signWithGoogle = async () => {
    setAuthing(true)
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        setUserName(
          response.user.displayName ||
            `RandomUser@${Math.floor(1000 + Math.random() * 9000)}`
        )
        navigate('/create-join')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Heading>
          WELCOME TO <HighlightedText> QUIZ HUB</HighlightedText>
        </Heading>
        <DetailText>Login to the QuizHub.</DetailText>
        <StyledHr />
        <BorderImage src={Google} onClick={signWithGoogle} />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizTopicsScreen
