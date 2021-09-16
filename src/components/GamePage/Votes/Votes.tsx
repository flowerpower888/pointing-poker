import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import UserCard from '../../LobbyPage/UserCard';
import './votes.scss';
import { Member } from '../../../types/types';
import columns from '../../../utils/votesTableColumns';

type VotesPropsType = {
  score?: string[];
};

type PlayerInfoForTable = {
  key: string;
  player: JSX.Element;
  score: string | number;
};

const Votes: React.FunctionComponent<VotesPropsType> = ({ score }) => {
  const members = Array<Member>();
  const [data, setData] = useState<PlayerInfoForTable[] | null>(null);

  useEffect(() => {
    setData(
      members
        .filter(member => member.userRole !== 'observer')
        .map((member, i) => {
          const player: PlayerInfoForTable = {
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
