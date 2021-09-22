import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import UserCard from '../../LobbyPage/UserCard';
import columns from '../../../utils/votesTableColumns';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import './votes.scss';

type VotesPropsType = {
  players: Member[];
  score?: string[];
};

type PlayerInfoForTable = {
  key: string;
  player: JSX.Element;
  score: string | number;
};

const Votes: React.FunctionComponent<VotesPropsType> = ({ players, score }) => {
  const currentPlayer = players.find(
    player => player.id === localStorage.getItem('userId'),
  );

  const [data, setData] = useState<PlayerInfoForTable[] | null>(null);

  useEffect(() => {
    setData(
      players.map((member, i) => {
        const player = {
          key: member.firstName,
          player: (
            <UserCard
              isOwner={member.isOwner}
              id={member.id}
              firstName={member.firstName}
              userRole={member.userRole}
              imagePath={member.imagePath}
              isCurrentPlayerMaster={currentPlayer?.isOwner}
            />
          ),
          score: score?.[i] || 'In progress',
        };

        return player;
      }),
    );
  }, [score, players, currentPlayer?.isOwner]);

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
