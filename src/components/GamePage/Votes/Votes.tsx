import { Table } from 'antd';
import React from 'react';
import members from '../../LobbyPage/ConstantsHardCode';
import UserCard from '../../LobbyPage/UserCard';
import './Votes.scss';

const Votes: React.FunctionComponent = () => {
  const data = members
    .filter(member => member.userRole !== 'observer')
    .map(member => {
      const player = {
        key: member.firstName,
        player: (
          <UserCard
            firstName={member.firstName}
            userRole={member.userRole}
            imagePath={member.imagePath}
            avatarSize="small"
          />
        ),
        score: 'In progress',
      };

      return player;
    });

  const columns = [
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
    },
  ];

  return (
    <div className="voting">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default Votes;
