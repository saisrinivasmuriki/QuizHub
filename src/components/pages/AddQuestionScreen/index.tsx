import React, { useState, ChangeEvent } from 'react'
import InputField from '../../atoms/InputField'
import Button from '../../atoms/Button'
import styled from 'styled-components'
import { useTheme } from 'styled-components'
import Modal from 'react-modal'
import { useQuiz } from '../../../context/QuizContext'
import { getAuth } from 'firebase/auth'

interface AddQuestionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const ModalContainer = styled.div`
  padding: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const InputFieldContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
`

const StyledCheckBox = styled.input`
  accent-color: ${({ theme }) => theme.colors.themeColor};
  width: 1rem;
  height: 1rem;
`

Modal.setAppElement('#root') // Set the root element for accessibility

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const currentTheme = useTheme()
  const initialStateOfQuestion = {
    question: '',
    options: ['Option...', 'Option...'],
    correctAnswers: [],
  }
  const [question, setQuestion] = useState(initialStateOfQuestion.question)
  const [options, setOptions] = useState(initialStateOfQuestion.options)
  const [correctAnswers, setCorrectAnswer] = useState<number[]>(
    initialStateOfQuestion.correctAnswers
  )
  const { addQuestion, userName } = useQuiz()

  const addOption = () => {
    setOptions([...options, 'Option...'])
  }

  const handleOptionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...options]
    updatedOptions[index] = event.target.value
    setOptions(updatedOptions)
  }

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target
    const idNum = Number(id)
    if (checked) {
      setCorrectAnswer([...correctAnswers, idNum])
    } else {
      setCorrectAnswer(correctAnswers.filter((ans) => ans !== idNum))
      // setCorrectAnswer(correctAnswers.filter((ans) => ans !== options[idNum]))
    }
  }

  const submitQuestion = () => {
    if (correctAnswers.length === 0) {
      alert('Please Select the Correct Answers by clicking on checkboxes')
    } else {
      // You can handle the submission logic here
      const correctOptions = correctAnswers.map((ans) => options[ans])
      addQuestion({
        question,
        choices: options,
        isMulti: correctOptions.length !== 1,
        correctAnswers: correctOptions,
        score: 1,
        user: userName,
      })
      setQuestion(initialStateOfQuestion.question)
      setCorrectAnswer(initialStateOfQuestion.correctAnswers)
      setOptions(initialStateOfQuestion.options)
      onRequestClose()
    }
  }

  const customStyles = {
    content: {
      backgroundColor: currentTheme.colors.cardBackground,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Question Modal"
      style={customStyles}
    >
      <ModalContainer>
        <InputFieldContainer>
          <h2>Add a Question</h2>
        </InputFieldContainer>
        <InputFieldContainer>
          <InputField
            type="text"
            placeholder="Enter Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <h3>Answer Options:</h3>
        </InputFieldContainer>
        {options.map((option, index) => (
          <div key={index}>
            <InputFieldContainer>
              <label htmlFor={index.toString()}>
                <StyledCheckBox
                  id={index.toString()}
                  type="checkbox"
                  onChange={handleCheckbox}
                />
              </label>
              <InputField
                id={index.toString()}
                type="text"
                placeholder={option}
                onChange={(e) => handleOptionChange(index, e)}
              />
            </InputFieldContainer>
          </div>
        ))}
        <ButtonContainer>
          <Button
            text="Add Option"
            onClick={addOption}
            iconPosition="left"
            outline={true}
            bold={false}
            big={true}
            disabled={false}
          />

          <Button
            text="Submit"
            onClick={submitQuestion}
            iconPosition="left"
            outline={true}
            bold={false}
            big={true}
            disabled={false}
          />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default AddQuestionModal
