import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, QPostive, Message } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import { LogoContainer, PageCenter } from '../../../styles/Global'

import Question from '../../organisms/Question'
import MenuBox from '../../molecules/MenuBox'
import AddQuestionModal from '../AddQuestionScreen'

const HeaderDiv = styled.div`
  display: flex;
`

const QuestionScreen: FC = () => {
  const [questionModal, setQuestionModal] = useState(false)
  const { questions, getGptQuestions, roomDetails } = useQuiz()

  useEffect(() => {
    if (roomDetails.QFromGPT) {
      getGptQuestions()
    }
  })

  const handleModal = () => {
    setQuestionModal(!questionModal)
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
              <Message onClick={handleModal} />,
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
    </>
  )
}

export default QuestionScreen
