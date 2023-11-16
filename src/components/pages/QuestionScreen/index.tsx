import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, QPostive, Message } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import { HighlightedText, LogoContainer, PageCenter } from '../../../styles/Global'

import Question from '../../organisms/Question'
import MenuBox from '../../molecules/MenuBox'
import AddQuestionModal from '../AddQuestionScreen'
import ChatModal from '../ChatScreen'
import SplashScreen from '../SplashScreen'
import { Heading } from '../LandingPage'
import { getAuth } from 'firebase/auth'

const HeaderDiv = styled.div`
  display: flex;
`

const QuestionScreen: FC = () => {
  const [questionModal, setQuestionModal] = useState(false)
  const [chatModal, setChatModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const { questions, getGptQuestions, roomDetails, gotFromGpt, loading, userName } =
    useQuiz()

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
      {!loading && (
        <>
          <PageCenter>
            <HeaderDiv>
              <LogoContainer>
                <AppLogo />
              </LogoContainer>
              <MenuBox
                icons={[
                  <QPostive onClick={handleModal} />,
                  <Message onClick={handleChatModal} />,
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
              const { question, isMulti, choices, code, image, correctAnswers, user } =
                ques
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
          </PageCenter>
          <AddQuestionModal isOpen={questionModal} onRequestClose={handleModal} />
          <ChatModal
            isOpen={chatModal}
            onRequestClose={handleChatModal}
            username={userName}
          />
        </>
      )}
      {loading && <SplashScreen />}
    </>
  )
}

export default QuestionScreen
