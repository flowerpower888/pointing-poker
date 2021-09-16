import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import UserCard from '../../LobbyPage/UserCard';
import './Votes.scss';
import { Member } from '../../../types/types';

type VotesPropsType = {
  score?: string[];
};

const Votes: React.FunctionComponent<VotesPropsType> = ({ score }) => {
  const members = Array<Member>();
  const [data, setData] = useState<
    | {
        key: string;
        player: JSX.Element;
        score: string | number;
      }[]
    | null
  >(null);

  useEffect(() => {
    setData(
      members
        .filter(member => member.userRole !== 'observer')
        .map((member, i) => {
          const player = {
            key: member.firstName,
            player: (
              <UserCard
                firstName={member.firstName}
                userRole={member.userRole}
                imagePath={member.imagePath}
                // avatarSize="small"
              />
            ),
            score: score?.[i] || 'In progress',
          };

          return player;
        }),
    );
  }, [score]);

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
      {data && (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          size="small"
        />
      )}
    </div>
  );
};

export default Votes;
