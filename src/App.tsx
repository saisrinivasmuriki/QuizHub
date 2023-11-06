import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './components/pages/Main'
import ToggleTheme from './components/atoms/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import QuestionScreen from './components/pages/QuestionScreen'

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentTheme(checked ? 'dark' : 'light')
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }

  const theme = currentTheme === 'light' ? themes.light : themes.dark

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QuizProvider>
        <ToggleTheme
          onChange={toggleTheme}
          currentTheme={currentTheme}
          checked={currentTheme === 'dark'}
          id="toggleTheme"
          value="theme"
        />
        {/* <Main /> */}
        <QuestionScreen />
      </QuizProvider>
    </ThemeProvider>
  )
}

export default App
