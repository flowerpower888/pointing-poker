import * as React from 'react';
import { Avatar, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './userCard.scss';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';

type UserCardPropsType = Member & {
  showPlayerKickConfirm?: (firstName: string) => void;
};

function UserCard(props: UserCardPropsType): JSX.Element {
  const {
    firstName,
    lastName,
    jobPosition,
    userRole,
    imagePath,
    isOwner,
    showPlayerKickConfirm,
  } = props;
  const { Meta } = Card;

  return (
    <Card className="user-card_container">
      {isOwner ? (
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
