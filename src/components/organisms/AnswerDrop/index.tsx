import React from 'react'
import Select, { ActionMeta, StylesConfig } from 'react-select'
import { useTheme } from 'styled-components'

interface optionsProps {
  value: string
  label: string
}

interface AnswerDropProps {
  isMulti: boolean
  options: string[]
  handleAnswerSelection: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void
}

const AnswerDrop = (props: AnswerDropProps) => {
  const { isMulti, options, handleAnswerSelection } = props

  const formatedOptions = options.map((option) => ({ value: option, label: option }))

  const currentTheme = useTheme()
  console.log(currentTheme)

  const styles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      boxShadow: ` 0 0 1rem 0 ${currentTheme.colors.themeColor}`,
      height: 'fit-content',
      maxWidth: '800px',
      width: '100%',
      minHeight: '60px',
      background: currentTheme.colors.background,
      color: currentTheme.colors.primaryText,
    }),
    input: (base) => ({
      ...base,
      color: currentTheme.colors.primaryText,
    }),
    singleValue: (base) => ({
      ...base,
      color: currentTheme.colors.primaryText,
    }),
    multiValue: (base) => ({
      ...base,
      color: 'black',
      background: 'white',
    }),
    option: (base, { data, isDisabled, isFocused, isSelected }) => ({
      ...base,
      maxWidth: '800px',
      width: '100%',
      background: isSelected
        ? currentTheme.colors.themeColor
        : isFocused
        ? currentTheme.colors.answerBg
        : 'transparent',
      color: currentTheme.colors.primaryText,
    }),
    menu: (base) => ({
      ...base,
      maxWidth: '800px',
      width: '100%',
      background: currentTheme.colors.background,
    }),
  }

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={formatedOptions[0]}
      isClearable={true}
      isSearchable={true}
      isMulti={isMulti}
      name="answer"
      options={formatedOptions}
      styles={styles}
      onChange={handleAnswerSelection}
    />
  )
}

export default AnswerDrop
