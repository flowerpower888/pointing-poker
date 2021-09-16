import * as React from 'react';
import { Avatar, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './userCard.scss';
import { Member } from '../../../types/types';

type UserCardPropsType = Member;

function UserCard(props: UserCardPropsType): JSX.Element {
  const { firstName, lastName, jobPosition, userRole, imagePath, isOwner } =
    props;
  const { Meta } = Card;

  return (
    <Card className="user-card_container">
      {isOwner ? <></> : <CloseOutlined className="delete_member" />}
      <p className="user-card_userRole">
        {isOwner ? 'Scrum master' : userRole}:
      </p>
      <Meta
        avatar={
          <Avatar
            style={{ backgroundColor: '#51d7c2' }}
            size="large"
            alt="user avatar"
            src={imagePath}
          >
            {firstName[0] + (lastName ? lastName[0] : '')}
          </Avatar>
        }
        title={`${firstName} ${lastName || ''}`}
        description={jobPosition}
      />
    </Card>
  );
}

export default UserCard;
