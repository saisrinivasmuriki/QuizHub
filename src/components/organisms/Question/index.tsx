import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../atoms/CodeSnippet'
import QuizImage from '../../atoms/QuizImage'
import AnswerDrop from '../AnswerDrop'
import { ActionMeta } from 'react-select'
import {
  UserDiv,
  checkResultIncludes,
} from '../../../styles/Global'
import { Next } from '../../../config/icons'
import Button from '../../atoms/Button'
import { answerResponseType } from '../../../types'
import { useQuiz } from '../../../context/QuizContext'

const QuizContainer = styled.div<{
  selectedAnswer: boolean
  response: answerResponseType
}>`
  width: 900px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 0px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  border: 2px solid
    ${({ response, theme }) =>
      response === 'Correct'
        ? theme.colors.success
        : response === 'Wrong'
        ? theme.colors.danger
        : theme.colors.darkGray};
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`

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

const AnswerDiv = styled.ol<{ response: answerResponseType }>`
  margin: 15px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.border};
  border: 2px solid
    ${({ theme, response }) =>
      response === 'Correct'
        ? theme.colors.success
        : response === 'Wrong'
        ? theme.colors.danger
        : theme.colors.darkGray};
`

interface QuestionTypes {
  question: string
  userName?: string
  code?: string
  image?: string
  isMulti: boolean
  choices: string[]
  correctAnswers: string[]
}

const Question = (props: QuestionTypes) => {
  const { question, userName, code, image, isMulti, choices, correctAnswers } = props

  const { result, setResult } = useQuiz()

  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [response, setResponse] = useState<answerResponseType>('UnAnswered')

  const areEqual = (arr1: string[], arr2: string[]) =>
    arr1.sort().join(',') === arr2.sort().join(',')

  const onClickNext = () => {
    const equal = areEqual(selectedAnswer, correctAnswers)
    equal === true ? setResponse('Correct') : setResponse('Wrong')
    setResult([...result, { ...props, selectedAnswer, isMatch: equal }])
  }

  useEffect(() => {
    const filters = checkResultIncludes(result, {
      question,
      code,
      image,
      isMulti,
      choices,
      correctAnswers,
      score: 10,
    })
    if (filters.length === 1) {
      setSelectedAnswer(filters[0].selectedAnswer)
      const equal = areEqual(selectedAnswer, correctAnswers)
      equal === true ? setResponse('Correct') : setResponse('Wrong')
    }
  })

  const handleAnswerSelection = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    if (typeof newValue === 'object' && !Array.isArray(newValue)) {
      const newV: { value: string; label: string } = JSON.parse(JSON.stringify(newValue))
      setSelectedAnswer([newV.value])
    }
    if (Array.isArray(newValue)) {
      const answers = newValue.map((value) => {
        const newV: { value: string; label: string } = JSON.parse(JSON.stringify(value))
        return newV.value
      })
      setSelectedAnswer(answers)
    }
  }

  return (
    <QuizContainer selectedAnswer={selectedAnswer.length > 0} response={response}>
      <QuestionContainer>
        <UserDiv response={response}>{userName}</UserDiv>
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
            disable={response !== 'UnAnswered'}
          />
        </AnswersContainer>
        {response !== 'UnAnswered' && (
          <AnswerDiv response={response}>
            {correctAnswers.map((ans) => (
              <li key={ans} style={{ listStyleType: 'disc', margin: '5px 20px' }}>
                {ans}
              </li>
            ))}
          </AnswerDiv>
        )}
      </QuestionContainer>
      <ButtonWrapper>
        <Button
          text="Submit"
          onClick={onClickNext}
          icon={<Next />}
          iconPosition="right"
          disabled={selectedAnswer.length == 0 || response !== 'UnAnswered'}
        />
      </ButtonWrapper>
    </QuizContainer>
  )
}

export default Question
