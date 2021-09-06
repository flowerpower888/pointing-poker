import * as React from 'react';
import { Avatar, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export interface UserData {
  firstName: string;
  lastName?: string;
  position?: string;
  userRole: 'scram master' | 'player' | 'observer';
  avatar?: string;
}

function userCard(props: UserData): JSX.Element {
  const { firstName, lastName, position, userRole, avatar } = props;
  const { Meta } = Card;
  return (
    <Card
      className="user-card_container"
      extra={userRole === 'scram master' ? '' : <CloseOutlined />}
    >
      <p className="user-card_role">{userRole}:</p>
      <Meta
        avatar={
          <Avatar
            style={{ backgroundColor: '#51d7c2' }}
            size="large"
            alt="user avatar"
            src={avatar}
          >
            {firstName[0] + (lastName ? lastName[0] : '')}
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        description={position}
      />
    </Card>
  );
}

export default userCard;
