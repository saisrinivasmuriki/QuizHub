import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { device } from '../../../styles/BreakPoints'
import { Menu as MenuIcon } from '../../../config/icons'
import { ControlledMenu, MenuItem, useClick } from '@szhsin/react-menu'

const IconDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
  svg {
    width: 50px;
    height: 50px;
    box-shadow: 0 0 1rem 0 ${({ theme }) => theme.colors.themeColor};
    border-radius: 9px;
    rect {
      stroke: ${({ theme }) => theme.colors.appLogo};
    }
    path {
      fill: ${({ theme }) => theme.colors.appLogo};
    }
  }
`

const IconContainer = styled.div`
  position: absolute;
  right: 26px;
  display: flex;
  gap: 10px;
  @media ${device.sm} {
    display: none;
  }
`

const MenuContainer = styled.div`
  position: absolute;
  right: 40px;
  gap: 10px;
  display: none;
  @media ${device.sm} {
    display: flex;
    z-index: 1;
  }
`

interface HeaderBoxProps {
  icons: ReactNode[]
}

const MenuBox = (props: HeaderBoxProps) => {
  const { icons } = props
  const [grow, setGrow] = useState(false)

  const ref = useRef(null)
  const anchorProps = useClick(grow, setGrow)

  const handleGrow = () => {
    setGrow(!grow)
  }

  const currentTheme = useTheme()

  const menuStyle = {
    paddingTop: '10px',
  }
  return (
    <div style={{ height: grow ? `${icons.length * 50 + 130}px` : 'fit-content' }}>
      <MenuContainer>
        <IconDiv {...anchorProps} ref={ref}>
          <MenuIcon style={{ padding: '10px' }} />
        </IconDiv>
        <ControlledMenu
          state={grow ? 'open' : 'closed'}
          anchorRef={ref}
          onClose={handleGrow}
          menuStyle={menuStyle}
        >
          {icons.map((icon, index) => (
            <MenuItem style={{ listStyleType: 'none' }} key={index} onClick={handleGrow}>
              <IconDiv>{icon}</IconDiv>
            </MenuItem>
          ))}
        </ControlledMenu>
      </MenuContainer>
      <IconContainer>
        {icons.map((icon, index) => (
          <IconDiv key={index}>{icon}</IconDiv>
        ))}
      </IconContainer>
    </div>
  )
}

export default MenuBox
