import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, QPostive, Message, Logout } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import { HighlightedText, LogoContainer, PageCenter } from '../../../styles/Global'

import Question from '../../organisms/Question'
import MenuBox from '../../molecules/MenuBox'
import AddQuestionModal from '../AddQuestionScreen'
import ChatModal from '../ChatScreen'
import SplashScreen from '../SplashScreen'
import { Heading } from '../LandingPage'

export const HeaderDiv = styled.div`
  display: flex;
`

const QuestionScreen: FC = () => {
  const [questionModal, setQuestionModal] = useState(false)
  const [chatModal, setChatModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const {
    questions,
    getGptQuestions,
    roomDetails,
    gotFromGpt,
    loading,
    userName,
    leaveRoom,
  } = useQuiz()

  useEffect(() => {
    if (!gotFromGpt) {
      if (roomDetails.QFromGPT && roomDetails.created) {
        getGptQuestions()
      }
    }
  })

  const handleModal = () => {
    setQuestionModal(!questionModal)
  }
  const handleChatModal = () => {
    setChatModal(!chatModal)
  }

  return (
    <>
      <PageCenter>
        <HeaderDiv>
          <LogoContainer>
            <AppLogo />
          </LogoContainer>
          <MenuBox
            icons={[
              <QPostive onClick={handleModal} style={{ cursor: 'pointer' }} />,
              <Message onClick={handleChatModal} style={{ cursor: 'pointer' }} />,
              <Logout
                style={{
                  width: '50px',
                  height: '50px',
                  padding: '5px',
                  cursor: 'pointer',
                }}
                onClick={leaveRoom}
              />,
            ]}
          />
        </HeaderDiv>
        <Heading>
          {roomDetails.title} [
          <HighlightedText
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(roomDetails.room)
              setCopied(true)
            }}
          >
            {roomDetails.room}
          </HighlightedText>
          ]&nbsp;{copied && <span style={{ color: 'green' }}>✔</span>}
        </Heading>
        {questions.map((ques, index) => {
          const { question, isMulti, choices, code, image, correctAnswers, user } = ques
          return (
            <Question
              key={index}
              question={question}
              userName={user}
              code={code}
              image={image}
              choices={choices}
              isMulti={isMulti}
              correctAnswers={correctAnswers}
            />
          )
        })}
        {loading && <p>Loading Questions From GPT...</p>}
      </PageCenter>
      <AddQuestionModal isOpen={questionModal} onRequestClose={handleModal} />
      <ChatModal
        isOpen={chatModal}
        onRequestClose={handleChatModal}
        username={userName}
      />
    </>
  )
}

export default QuestionScreen
