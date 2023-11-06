import { FC } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../atoms/CodeSnippet'
import QuizImage from '../../atoms/QuizImage'
import AnswerDrop from '../AnswerDrop'
import { ActionMeta } from 'react-select'
import { UserDiv } from '../../../styles/Global'

const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const AnswersContainer = styled.div`
  max-width: 78%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const QuestionStyle = styled.h2`
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.3;
`

interface QuestionTypes {
  question: string
  userName: string
  code?: string
  image?: string
  isMulti: boolean
  choices: string[]
  handleAnswerSelection: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void
}

const Question: FC<QuestionTypes> = ({
  question,
  userName,
  code,
  image,
  isMulti,
  choices,
  handleAnswerSelection,
}) => {
  return (
    <QuestionContainer>
      <UserDiv>{userName}</UserDiv>
      <QuestionStyle>{question}</QuestionStyle>
      {/* if question contains code snippet then show code */}
      {code && <CodeSnippet code={code} language="javascript" />}
      {/* if question contains an image */}
      {image && <QuizImage image={image} />}
      <AnswersContainer>
        <AnswerDrop
          options={choices}
          handleAnswerSelection={handleAnswerSelection}
          isMulti={isMulti}
        />
      </AnswersContainer>
    </QuestionContainer>
  )
}

export default Question
