import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import UserCard from './UserCard';
import MembersList from './Members';
import Issues from './Issues';
import {
  GameInfo,
  GameStatus,
} from '../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPage.scss';
import gameAPI from '../../api/gameAPI';
import memberAPI from '../../api/memberAPI';

type Game = {
  info: GameInfo;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

function LobbyPage(props: Game): JSX.Element {
  const history = useHistory();

  const { info: gameInfo, setGameStatus } = props;
  const owner = gameInfo.members.find(member => member.isOwner) || null;
  const players = gameInfo.members.filter(member => !member.isOwner);
  const isUserAnOwner = owner
    ? owner.id === localStorage.getItem('userId')
    : false;

  const onStartGame = () => {
    gameAPI.start(gameInfo.id);
    setGameStatus('started');
  };

  const onExit = async () => {
    const playerId = gameInfo.members.find(
      member => member.id === localStorage.getItem('userId'),
    )?.id;

    if (playerId) {
      history.push('/');
      await memberAPI.delete(playerId, gameInfo.id);
      localStorage.removeItem('userId');
    }
  };

  return (
    <div className="lobby-page">
      {owner && (
        <>
          <h2 className="lobby-title"> Spring planning</h2>

          <div className="card_container">
            <Col span={10}>
              <UserCard
                isOwner={owner.isOwner}
                imagePath={owner.imagePath}
                firstName={owner.firstName}
                lastName={owner.lastName}
                userRole={owner.userRole}
                jobPosition={owner.jobPosition}
              />
            </Col>
            <Col>
              <Paragraph
                className="lobby-copy-link"
                copyable={{ text: `${gameInfo.id}` }}
              >
                Link to share
              </Paragraph>
            </Col>
          </div>

          <div className="lobby-page_btn-container">
            {isUserAnOwner ? (
              <>
                <Button
                  className="lobby-btn scram"
                  type="primary"
                  size="large"
                  onClick={onStartGame}
                >
                  Start game
                </Button>
                <Button
                  className="lobby-btn"
                  type="default"
                  size="large"
                  onClick={() => {
                    if (gameInfo.status === 'started')
                      gameAPI.complete(gameInfo.id);
                  }}
                >
                  Cancel game
                </Button>
              </>
            ) : (
              <Button
                className="lobby-btn player"
                type="default"
                size="large"
                onClick={onExit}
              >
                Exit
              </Button>
            )}
          </div>

          {gameInfo.members.length - 1 > 0 && <MembersList members={players} />}

          {(isUserAnOwner || (!isUserAnOwner && gameInfo.tasks.length > 0)) && (
            <Issues
              editable={isUserAnOwner}
              showAddIssueInput={isUserAnOwner}
              showDeleteBtn={isUserAnOwner}
              tasks={gameInfo.tasks}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LobbyPage;
