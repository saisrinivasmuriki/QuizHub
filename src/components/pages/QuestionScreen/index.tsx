import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, QPostive, Message } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import { LogoContainer, PageCenter } from '../../../styles/Global'

import Question from '../../organisms/Question'
import MenuBox from '../../molecules/MenuBox'
import AddQuestionModal from '../AddQuestionScreen'
import ChatModal from '../ChatScreen'

const HeaderDiv = styled.div`
  display: flex;
`

const QuestionScreen: FC = () => {
  const [questionModal, setQuestionModal] = useState(false)
  const [chatModal, setChatModal] = useState(false)
  const { questions, getGptQuestions, roomDetails } = useQuiz()

  useEffect(() => {
    if (roomDetails.QFromGPT) {
      getGptQuestions()
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
              <QPostive onClick={handleModal} />,
              <Message onClick={handleChatModal} />,
            ]}
          />
        </HeaderDiv>
        {questions.map((ques, index) => {
          const { question, isMulti, choices, code, image, correctAnswers } = ques
          return (
            <Question
              key={index}
              question={question}
              userName="User1"
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
        username={'Temporary User'}
      />
    </>
  )
}

export default QuestionScreen
