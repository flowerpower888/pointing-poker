import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import {
  Avatar,
  Drawer,
  Input,
  message as MessageAntd,
  Popover,
  Result,
} from 'antd';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import chatAPI from '../../api/chatAPI';
import { Member, Message } from '../../models/GameInfoAggregate/GameInfoModel';
import styles from './chat.module.scss';
import ContextMenuPopup from './ContextMenuPopup';

type ChatPropsType = {
  messages: Array<Message>;
  members: Array<Member>;
  setIsChatShown: React.Dispatch<React.SetStateAction<boolean>>;
  isChatShown: boolean;
};

const Chat: FC<ChatPropsType> = ({
  messages,
  members,
  setIsChatShown,
  isChatShown,
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  const userId = localStorage.getItem('userId');
  const [newMessage, setNewMessage] = useState<string>('');

  const sendMessage = async () => {
    try {
      if (userId) {
        await chatAPI.sendMessage(gameId, { userId, text: newMessage });
      }
    } catch {
      MessageAntd.error('The message was not send!');
    }
    setNewMessage('');
  };
  return (
    <Drawer
      title="Chat"
      placement="right"
      visible={isChatShown}
      contentWrapperStyle={{ maxWidth: 500, width: '100%' }}
      className={styles.chat}
      onClose={() => setIsChatShown(false)}
      footer={
        <Input
          placeholder="Write a message..."
          size="large"
          onChange={event => setNewMessage(event.target.value)}
          suffix={
            <SendOutlined className={styles.sendIcon} onClick={sendMessage} />
          }
          onPressEnter={sendMessage}
          value={newMessage}
          className={styles.input}
        />
      }
    >
      {!messages.length && (
        <Result icon={<SmileOutlined />} title="Start a conversation!" />
      )}
      {messages.map(message => {
        const ownerCurrentMessage = members.find(
          member => member.id === message.userId,
        );
        return (
          <div
            className={`${styles.message} ${
              userId === message.userId ? styles.reversing : ''
            }`}
          >
            <Avatar
              style={
                ownerCurrentMessage && ownerCurrentMessage.imagePath
                  ? { backgroundColor: 'transparent' }
                  : { backgroundColor: '#51d7c2' }
              }
              size="large"
              alt="user avatar"
              src={ownerCurrentMessage ? ownerCurrentMessage.imagePath : ''}
            >
              {ownerCurrentMessage &&
                ownerCurrentMessage.firstName[0] +
                  (ownerCurrentMessage.lastName
                    ? ownerCurrentMessage.lastName[0]
                    : '')}
            </Avatar>
            <Popover
              content={<ContextMenuPopup copyText={message.text} />}
              trigger="contextMenu"
            >
              <div
                className={`${styles.text} ${
                  userId === message.userId ? styles.right : styles.left
                }`}
              >
                <div className={styles.name}>
                  {userId === message.userId
                    ? ''
                    : ownerCurrentMessage?.firstName}
                </div>
                {message.text}
              </div>
            </Popover>
          </div>
        );
      })}
    </Drawer>
  );
};

export default Chat;
