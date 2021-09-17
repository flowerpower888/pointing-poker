import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserCard from '../../LobbyPage/UserCard';
import columns from '../../../utils/votesTableColumns';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import './votes.scss';

type VotesPropsType = {
  players: Member[];
  score?: string[];
  onPlayerKick: (firstName: string) => Promise<void>;
};

type PlayerInfoForTable = {
  key: string;
  player: JSX.Element;
  score: string | number;
};

const Votes: React.FunctionComponent<VotesPropsType> = ({
  players,
  score,
  onPlayerKick,
}) => {
  const { confirm } = Modal;

  const [data, setData] = useState<PlayerInfoForTable[] | null>(null);

  useEffect(() => {
    const showPlayerKickConfirm = (firstName: string) => {
      confirm({
        title: `Do you really want to kick member ${firstName}?`,
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          onPlayerKick(firstName);
        },
        centered: true,
        maskClosable: true,
      });
    };

    setData(
      players.map((member, i) => {
        const player = {
          key: member.firstName,
          player: (
            <UserCard
              firstName={member.firstName}
              userRole={member.userRole}
              imagePath={member.imagePath}
              showPlayerKickConfirm={showPlayerKickConfirm}
            />
          ),
          score: score?.[i] || 'In progress',
        };

        return player;
      }),
    );
  }, [score, players, onPlayerKick, confirm]);

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
