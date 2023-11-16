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
import QuestionScreen from './components/pages/QuestionScreenNew'

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
          <ToggleTheme
            onChange={toggleTheme}
            currentTheme={currentTheme}
            checked={currentTheme === 'dark'}
            id="toggleTheme"
            value="theme"
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/create-join"
                element={
                  <AuthGuard>
                    <QuizDetailsScreen />
                  </AuthGuard>
                }
              />
              <Route
                path="/room"
                element={
                  <AuthGuard>
                    <QuestionScreen />
                  </AuthGuard>
                }
              />
              {/* <Route path="/" element={<QuizTopicsScreen />} /> */}
            </Routes>
          </ToggleTheme>
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
