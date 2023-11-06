import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface InputFieldProps {
  type: 'text' | 'password'
  placeholder?: string
  icons?: {
    left?: ReactNode
    right?: ReactNode
  }
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBox = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 1rem 0 ${({ theme }) => theme.colors.themeColor};
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  max-width: 500px;
  width: 80%;

  &:focus-within {
    transform: scale(0.99);
    border: 1px solid ${({ theme }) => theme.colors.appLogo};
    transition: 0.2s all;
  }
`

const TextInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`

export const LogoContainer = styled.div`
  text-align: center;
  svg {
    width: 30px;
    height: 30px;
    rect {
      stroke: ${({ theme }) => theme.colors.appLogo};
    }
    path {
      fill: ${({ theme }) => theme.colors.appLogo};
    }
  }
`

const InputField = (props: InputFieldProps) => {
  const { type, icons, placeholder, onChange } = props
  return (
    <InputBox>
      <LogoContainer>{icons?.left}</LogoContainer>
      <TextInput type={type} placeholder={placeholder} onChange={onChange}></TextInput>
      <LogoContainer>{icons?.right}</LogoContainer>
    </InputBox>
  )
}

export default InputField
