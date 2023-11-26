import styled from 'styled-components'

import { AppLogo, Logout, StartIcon } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../../styles/Global'
import { ScreenTypes } from '../../../types'
import { convertSeconds } from '../../../utils/helpers'

import Button from '../../atoms/Button'
import { device } from '../../../styles/BreakPoints'
import InputField from '../../atoms/InputField'
import { useState } from 'react'
import { title } from 'process'
import { getAuth, signOut } from 'firebase/auth'
import { HeaderDiv } from '../QuestionScreen'
import { useNavigate } from 'react-router-dom'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  @media ${device.md} {
    flex-direction: column;
  }
`
const DetailTextBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Seperator = styled.hr`
  @media ${device.md} {
    width: 80%;
  }
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`
const DetailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const CenterAlign = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  @media ${device.md} {
    margin-bottom: 50px;
  }
`

export const StyledCheckBox = styled.input`
  accent-color: ${({ theme }) => theme.colors.themeColor};
  margin: 0px 10px;
`

const LeftAlign = styled.div`
  text-align: left;
`

const LogoutDiv = styled.div`
  cursor: pointer;
  height: fit-content;
  fill: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.themeColor};
  padding: 0px 8px 0px 0px;
  border-radius: 8px;
  margin-left: auto;
`

const QuizDetailsScreen = () => {
  const [createRoomData, setCreateRoomData] = useState({ title: '', QFromGPT: false })
  const [joinRoomData, setJoinRoomData] = useState('')
  const auth = getAuth()
  const user = auth.currentUser
  const navigate = useNavigate()

  const googleSignout = () => {
    signOut(auth).then((res) => {
      console.log(res)
      navigate('/')
    })
  }

  const { createRoom, joinRoom } = useQuiz()

  const changeCreateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    switch (name) {
      case 'roomTitle':
        setCreateRoomData({ ...createRoomData, title: value })
        break
      case 'needGPT':
        setCreateRoomData({ ...createRoomData, QFromGPT: event.target.checked })
        break
    }
  }

  const changeJoinData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinRoomData(event.target.value)
  }

  const creatingRoom = () => {
    const roomNumber = Math.floor(1000 + Math.random() * 9000)
    const room = `${createRoomData.title
      .replace(' ', '')
      .toLowerCase()
      .slice(0, 4)}-${roomNumber}`
    const { QFromGPT, title } = createRoomData
    createRoom(room, QFromGPT, title)
  }

  const joinigRoom = () => {
    joinRoom(joinRoomData)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoutDiv onClick={googleSignout}>
          <Logout
            style={{
              width: '35px',
              height: '35px',
              padding: '5px',
            }}
          />
          <p style={{ fontWeight: 'bolder', fontSize: '20px', color: 'red' }}>Logout</p>
        </LogoutDiv>
        <LogoContainer style={{ marginTop: '-2rem' }}>
          <AppLogo />
        </LogoContainer>
        <AppTitle>QUIZ HUB</AppTitle>
        <DetailTextContainer>
          <DetailTextBox>
            <DetailText>
              <HighlightedText>Create</HighlightedText> Room
            </DetailText>
            <DetailBox>
              <label htmlFor="roomTitle" style={{ width: '120px' }}>
                Room Title:
              </label>
              <InputField
                type={'text'}
                placeholder="Enter Title For Room."
                id="roomTitle"
                onChange={changeCreateData}
              />
            </DetailBox>
            <DetailBox>
              <StyledCheckBox
                type="checkbox"
                name="needGPT"
                id="needGPT"
                onChange={changeCreateData}
              />
              <label htmlFor="needGPT">Need Q's from ChatGPT</label>
            </DetailBox>
            <CenterAlign>
              <Button text="Create the Room" iconPosition="left" onClick={creatingRoom} />
            </CenterAlign>
          </DetailTextBox>
          <Seperator />
          <DetailTextBox>
            <DetailText>
              <HighlightedText>Join</HighlightedText> Room
            </DetailText>
            <DetailBox>
              <LeftAlign>
                <label htmlFor="joinCode" style={{ width: '120px' }}>
                  Join Code:
                </label>
              </LeftAlign>
              <InputField
                type={'text'}
                placeholder="Enter Code to Join."
                id="joinCode"
                onChange={changeJoinData}
              />
            </DetailBox>
            <CenterAlign>
              <Button text="Join the Room" iconPosition="left" onClick={joinigRoom} />
            </CenterAlign>
          </DetailTextBox>
          {/* <DetailText>
            Selected Quiz Topic: <HighlightedText>{selectedQuizTopic}</HighlightedText>
          </DetailText>
          <DetailText>
            Total questions to attempt:{' '}
            <HighlightedText>{totalQuestions}</HighlightedText>
          </DetailText>
          <DetailText>
            Score in total: <HighlightedText>{totalScore}</HighlightedText>
          </DetailText>
          <DetailText>
            Total time: <HighlightedText>{convertSeconds(totalTime)}</HighlightedText>
          </DetailText>
          <DetailText>
            To save time, you can skip questions. Skipped questions will show up at the
            end of the quiz.
          </DetailText> */}
        </DetailTextContainer>
        {/* <Button
          text="Start"
          icon={<StartIcon />}
          iconPosition="left"
          onClick={goToQuestionScreen}
          bold
        /> */}
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizDetailsScreen

// <DetailText>
// <HighlightedText>Create</HighlightedText> Room
// </DetailText>
// <DetailBox>
// <label htmlFor="roomTitle">Room Title:</label>
// <InputField
//   type={'text'}
//   placeholder="Enter Title For Room."
//   id="roomTitle"
//   onChange={changeCreateData}
// />
// </DetailBox>
// <LeftAlign>
// <StyledCheckBox
//   type="checkbox"
//   name="needGPT"
//   id="needGPT"
//   onChange={changeCreateData}
// />
// <label htmlFor="needGPT">Need Q's from ChatGPT</label>
// </LeftAlign>
// <CenterAlign>
// <Button text="Create the Room" iconPosition="left" onClick={creatingRoom} />
// </CenterAlign>
// </DetailTextBox>

{
  /* <DetailTextBox>
<DetailText>
  <HighlightedText>Join</HighlightedText> Room
</DetailText>
<DetailBox>
  <LeftAlign>
    <label htmlFor="joinCode">Join Code:</label>
  </LeftAlign>
  <InputField
    type={'text'}
    placeholder="Enter Code to Join."
    id="joinCode"
    onChange={changeJoinData}
  />
</DetailBox>
<CenterAlign>
  <Button text="Join the Room" iconPosition="left" onClick={joinigRoom} />
</CenterAlign>
</DetailTextBox> */
}
