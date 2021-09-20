import * as React from 'react';
import { Avatar, Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './userCard.scss';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import memberAPI from '../../../api/memberAPI';

type UserCardPropsType = Member & {
  showPlayerKickConfirm?: (id: string, firstname: string) => void;
} & { isUserOwner?: boolean };

function UserCard(props: UserCardPropsType): JSX.Element {
  const {
    firstName,
    lastName,
    jobPosition,
    userRole,
    imagePath,
    isOwner,
    id,
    isUserOwner,
    showPlayerKickConfirm,
  } = props;
  const { Meta } = Card;

  const deleteMember = () => {
    const gameId = localStorage.getItem('gameId');
    if (gameId && id) {
      memberAPI.delete(id, gameId);
    }
  };
  const deleteByVote = () => {};

  return (
    <Card
      className="user-card_container"
      style={{ marginLeft: '20px', marginTop: '20px' }}
    >
      {id !== localStorage.getItem('userId') && !isOwner && (
        <Button
          className="delete_member"
          htmlType="button"
          icon={<CloseOutlined />}
          onClick={
            showPlayerKickConfirm && isUserOwner
              ? () => showPlayerKickConfirm(id || '', firstName)
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
