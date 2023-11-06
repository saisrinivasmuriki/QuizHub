import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo } from '../../../config/icons'
import { PageCenter } from '../../../styles/Global'

interface LogoAnimationProps {
  logoSize: string
}

const LogoAnimation = styled.div<LogoAnimationProps>`
  svg {
    transform: ${({ logoSize }) => `scale(${logoSize},${logoSize})`};
    transition: all 1s ease-in-out;
    rect {
      stroke: ${({ theme }) => theme.colors.appLogo};
    }
    path {
      fill: ${({ theme }) => theme.colors.appLogo};
    }
  }
`

const SplashScreen = () => {
  const [logoSize, setLogoSize] = useState('1')

  useEffect(() => {
    const handleResize = () => {
      setLogoSize('3')
    }

    // Set initial logo size
    handleResize()

    // Update logo size on window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageCenter justifyCenter>
      <LogoAnimation logoSize={logoSize}>
        <AppLogo />
      </LogoAnimation>
    </PageCenter>
  )
}

export default SplashScreen
