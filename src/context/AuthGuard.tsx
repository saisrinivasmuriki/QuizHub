import { ReactNode, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../components/pages/SplashScreen'

const AuthGuard = (props: { children: ReactNode }) => {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AuthCheck()
  }, [auth])

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false)
    } else {
      console.log('unauthorized')
      // window.location.href = '/'
      navigate('/')
    }
  })

  if (loading) {
    return <SplashScreen />
  }

  return <>{children}</>
}

export default AuthGuard
