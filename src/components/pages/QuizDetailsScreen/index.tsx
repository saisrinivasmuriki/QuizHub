import styled from 'styled-components'

import { AppLogo, StartIcon } from '../../../config/icons'
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
  max-width: 608px;
  display: flex;
  justify-content: space-evenly;

  @media ${device.md} {
    flex-direction: column;
  }
`
const DetailTextBox = styled.div`
  max-width: 45%;
  width: fit-content;

  @media ${device.md} {
    max-width: 95%;
  }
`

const Seperator = styled.hr`
  margin: 8px 0px;
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
  margin-top: 15px;
  margin-bottom: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 300px;
  flex-direction: column;
`

const CenterAlign = styled.div`
  display: flex;
  justify-content: center;
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

const QuizDetailsScreen = () => {
  const [createRoomData, setCreateRoomData] = useState({ title: '', QFromGPT: false })
  const [joinRoomData, setJoinRoomData] = useState('')

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
      .slice(0,4)}-${roomNumber}`
    const { QFromGPT, title } = createRoomData
    createRoom(room, QFromGPT, title)
  }

  const joinigRoom = () => {
    joinRoom(joinRoomData)
  }

  // const { setCurrentScreen, quizDetails } = useQuiz()

  // const { selectedQuizTopic, totalQuestions, totalScore, totalTime } = quizDetails

  // const goToQuestionScreen = () => {
  //   setCurrentScreen(ScreenTypes.QuestionScreen)
  // }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <AppTitle>QUIZ HUB</AppTitle>
        <DetailTextContainer>
          <DetailTextBox>
            <DetailText>
              <HighlightedText>Create</HighlightedText> Room
            </DetailText>
            <DetailBox>
              <LeftAlign>
                <label htmlFor="roomTitle">Room Title:</label>
              </LeftAlign>
              <InputField
                type={'text'}
                placeholder="Enter Title For Room."
                id="roomTitle"
                onChange={changeCreateData}
              />
              <LeftAlign>
                <StyledCheckBox
                  type="checkbox"
                  name="needGPT"
                  id="needGPT"
                  onChange={changeCreateData}
                />
                <label htmlFor="needGPT">Need Q's from ChatGPT</label>
              </LeftAlign>
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
