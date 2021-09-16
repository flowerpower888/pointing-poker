import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UserData } from '../../LobbyPage/UserCard/UserCard';
import UserCard from '../../LobbyPage/UserCard';
import './Votes.scss';

type Props = {
  players: UserData[];
  score?: string[];
  onPlayerKick: (firstName: string) => Promise<void>;
};

const Votes: React.FunctionComponent<Props> = ({
  players,
  score,
  onPlayerKick,
}) => {
  const { confirm } = Modal;

  const [data, setData] = useState<
    | {
        key: string;
        player: JSX.Element;
        score: string | number;
      }[]
    | null
  >(null);

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
              avatarSize="small"
              showPlayerKickConfirm={showPlayerKickConfirm}
            />
          ),
          score: score?.[i] || 'In progress',
        };

        return player;
      }),
    );
  }, [score, players, onPlayerKick, confirm]);

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
