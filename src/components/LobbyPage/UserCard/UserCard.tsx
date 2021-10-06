import * as React from 'react';
import { Avatar, Button, Card, Modal } from 'antd';
import {
  CloseOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './userCard.scss';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import memberAPI from '../../../api/memberAPI';
import votingAPI from '../../../api/votingAPI';
import kickByVoteAPI from '../../../api/kickByVoteAPI';

type UserCardPropsType = Member & {
  isCurrentPlayerMaster?: boolean;
  extraStyles?: React.CSSProperties;
};

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
    extraStyles,
  } = props;

  const { Meta } = Card;
  const { confirm } = Modal;

  const showPlayerKickConfirm = (playerId: string, firstname: string) => {
    confirm({
      title: `Do you really want to kick member ${firstname}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const gameId = localStorage.getItem('gameId');
        const kickProposeById = localStorage.getItem('userId');
        if (gameId && playerId && kickProposeById) {
          if (isCurrentPlayerMaster) {
            memberAPI.delete(playerId, gameId);
            votingAPI.removeVote(gameId, playerId);
          } else {
            kickByVoteAPI.sendVotes(
              gameId,
              playerId,
              kickProposeById,
              'start kicking',
              true,
            );
          }
        }
      },
      centered: true,
      maskClosable: true,
    });
  };

  return (
    <Card
      className="user-card_container"
      style={{ marginLeft: '20px', marginTop: '20px', ...extraStyles }}
    >
      {id !== localStorage.getItem('userId') && !isOwner && (
        <Button
          className="delete_member"
          htmlType="button"
          icon={<CloseOutlined />}
          onClick={() => {
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
            style={
              imagePath
                ? { backgroundColor: 'transparent' }
                : { backgroundColor: '#51d7c2' }
            }
            size="large"
            alt="user avatar"
            src={imagePath || <UserOutlined />}
          >
            {`${firstName[0]}${lastName?.[0] || ''}`}
          </Avatar>
        }
        title={`${firstName} ${lastName || ''}`}
        description={jobPosition}
      />
    </Card>
  );
}

export default UserCard;
