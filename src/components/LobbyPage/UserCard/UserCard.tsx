import * as React from 'react';
import { Avatar, Button, Card, Modal } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './userCard.scss';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import memberAPI from '../../../api/memberAPI';

type UserCardPropsType = Member & { isCurrentPlayerMaster?: boolean };

function UserCard(props: UserCardPropsType): JSX.Element {
  const {
    firstName,
    lastName,
    jobPosition,
    userRole,
    imagePath,
    isOwner,
    id,
    isCurrentPlayerMaster,
  } = props;

  const { Meta } = Card;
  const { confirm } = Modal;

  const onPlayerKick = async (playerId: string) => {
    const gameId = localStorage.getItem('gameId');

    if (gameId && playerId) {
      memberAPI.delete(playerId, gameId);
    }
  };

  const showPlayerKickConfirm = (playerId: string, firstname: string) => {
    confirm({
      title: `Do you really want to kick member ${firstname}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onPlayerKick(playerId);
      },
      centered: true,
      maskClosable: true,
    });
  };

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
          onClick={() => {
            if (isCurrentPlayerMaster)
              showPlayerKickConfirm(id || '', firstName);
          }}
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
