import * as React from 'react';
import { Avatar, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './userCard.css';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

export interface UserData {
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  userRole: 'scram master' | 'player' | 'observer';
  imagePath?: string;
  avatarSize?: AvatarSize;
  showPlayerKickConfirm?: (firstName: string) => void;
}

function UserCard(props: UserData): JSX.Element {
  const {
    firstName,
    lastName,
    jobPosition,
    userRole,
    imagePath,
    avatarSize,
    showPlayerKickConfirm,
  } = props;
  const { Meta } = Card;

  return (
    <Card className="user-card_container">
      {userRole === 'scram master' ? (
        <></>
      ) : (
        <CloseOutlined
          className="delete_member"
          onClick={
            showPlayerKickConfirm
              ? () => showPlayerKickConfirm(firstName)
              : undefined
          }
        />
      )}
      <p className="user-card_role">{userRole}:</p>
      <Meta
        avatar={
          <Avatar
            style={{ backgroundColor: '#51d7c2' }}
            size={avatarSize || 'large'}
            alt="user avatar"
            src={imagePath}
          >
            {firstName[0] + (lastName ? lastName[0] : '')}
          </Avatar>
        }
        title={`${firstName}${lastName || ''}`}
        description={jobPosition}
      />
    </Card>
  );
}

export default UserCard;
