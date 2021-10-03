import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import UserCard from '../../LobbyPage/UserCard';
import columns from '../../../utils/votesTableColumns';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import './votes.scss';
import { TaskScore } from '../../../models/RoundResult/RoundModel';

type VotesPropsType = {
  players: Member[];
  score?: TaskScore[];
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
      players.map(member => ({
        key: member.id || '',
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
        score:
          score?.find(x => x.playerId === member.id)?.card.value ||
          'In progress',
      })),
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
