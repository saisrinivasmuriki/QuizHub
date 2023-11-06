import React from 'react'
import styled from 'styled-components'

interface TextAreaProps {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const StyledTextare = styled.textarea`
  border-radius: 8px;
  box-shadow: 0 0 1rem 0 ${({ theme }) => theme.colors.themeColor};
  padding: 10px;
  font-size: 0.9rem;
  max-width: 500px;
  width: 90%;

  &:focus {
    transform: scale(0.99);
    border: 1px solid ${({ theme }) => theme.colors.appLogo};
    transition: 0.2s all;
  }
`

const Textarea = (props: TextAreaProps) => {
  const { placeholder, onChange } = props
  return (
    <StyledTextare placeholder={placeholder} onChange={onChange} rows={5}></StyledTextare>
  )
}

export default Textarea
