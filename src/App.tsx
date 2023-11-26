import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './components/pages/Main'
import ToggleTheme from './components/atoms/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/Firebase'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import AuthGuard from './context/AuthGuard'
import QuizDetailsScreen from './components/pages/QuizDetailsScreen'
import QuestionScreen from './components/pages/QuestionScreen'

initializeApp(firebaseConfig)

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
      <BrowserRouter>
        <QuizProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ToggleTheme
                  onChange={toggleTheme}
                  currentTheme={currentTheme}
                  checked={currentTheme === 'dark'}
                  id="toggleTheme"
                  value="theme"
                >
                  <LandingPage />{' '}
                </ToggleTheme>
              }
            />
            <Route
              path="/create-join"
              element={
                <AuthGuard>
                  <ToggleTheme
                    onChange={toggleTheme}
                    currentTheme={currentTheme}
                    checked={currentTheme === 'dark'}
                    id="toggleTheme"
                    value="theme"
                  >
                    <QuizDetailsScreen />
                  </ToggleTheme>
                </AuthGuard>
              }
            />
            <Route
              path="/room"
              element={
                <AuthGuard>
                  <ToggleTheme
                    onChange={toggleTheme}
                    currentTheme={currentTheme}
                    checked={currentTheme === 'dark'}
                    id="toggleTheme"
                    value="theme"
                  >
                    <QuestionScreen />
                  </ToggleTheme>
                </AuthGuard>
              }
            />
          </Routes>
        </QuizProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

{
  /* <ToggleTheme
          onChange={toggleTheme}
          currentTheme={currentTheme}
          checked={currentTheme === 'dark'}
          id="toggleTheme"
          value="theme"
        />
        <Main /> */
}
