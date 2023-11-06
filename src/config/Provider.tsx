import React, { ReactNode } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { themes } from '../styles/Theme'

interface ProviderType {
  children?: ReactNode
  theme?: DefaultTheme | ((theme: DefaultTheme) => DefaultTheme) | undefined
}

export const Provider = (props: ProviderType) => {
  console.log(props.theme)
  return (
    <ThemeProvider theme={props.theme ? props.theme : themes.light}>
      {props.children}
    </ThemeProvider>
  )
}
