import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import InputField from '../../atoms/InputField'
import { ChatFeed, Message } from 'react-chat-ui'
import styled, { useTheme } from 'styled-components'
import { Send } from '../../../config/icons'

Modal.setAppElement('#root') // Set the root element for accessibility

interface ChatModalProps {
  isOpen: boolean
  onRequestClose: () => void
  username: string
}

const StyledImg = styled.img`
  border: 2px solid ${({ theme }) => theme.colors.primaryText};
  margin-left: 12px;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
`

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onRequestClose, username }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const currentTheme = useTheme()

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessages = [
        ...messages,
        new Message({ id: 0, message: newMessage, senderName: username }),
      ]
      setMessages(newMessages)
      setNewMessage('')
      setIsTyping(false)
    }
  }

  const handleTyping = (text: string) => {
    setNewMessage(text)
    setIsTyping(text.length > 0)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chat Modal"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          backgroundColor: currentTheme.colors.cardBackground,
          height: '70%', // Set the desired height
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        },
      }}
    >
      <h1>Chat</h1>
      <ChatFeed
        messages={messages}
        isTyping={isTyping}
        hasInputField={false}
        bubbleStyles={{
          text: { fontSize: 16 },
          backgroundColor: currentTheme.colors.background,
        }}
      />
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', marginTop: '16px' }}>
          <InputField
            type="text"
            placeholder="Enter message"
            onChange={(e) => handleTyping(e.target.value)}
          />
          <StyledImg
            src={Send}
            width={'50px'}
            height={'50px'}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ChatModal
