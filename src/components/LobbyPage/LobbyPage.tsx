import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, message } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import UserCard from './UserCard';
import MembersList from './Members';
import Issues from './Issues';
import {
  GameInfo,
  GameStatus,
  SettingsType,
} from '../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPage.scss';
import gameAPI from '../../api/gameAPI';
import memberAPI from '../../api/memberAPI';
import Settings from './Settings';
import settingsAPI from '../../api/settingsAPI';

type Game = {
  info: GameInfo;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

function LobbyPage(props: Game): JSX.Element {
  const { info: gameInfo, setGameStatus } = props;
  const history = useHistory();
  const initialSettings: SettingsType = {
    isAutoEnteringPlayers: false,
    cardsSet: 'fibonacci',
    ownCardsSet: [],
    isChangingCardInRoundEnd: false,
    isTimerNeeded: false,
    roundTime: 0,
  };
  const [settings, setSettings] = useState<SettingsType>(
    gameInfo.settings && Object.keys(gameInfo.settings).length
      ? gameInfo.settings
      : initialSettings,
  );

  const owner = gameInfo.members.find(member => member.isOwner) || null;
  const players = gameInfo.members.filter(member => !member.isOwner);
  const isUserAnOwner = owner
    ? owner.id === localStorage.getItem('userId')
    : false;

  const onStartGame = async () => {
    if (
      settings &&
      settings.cardsSet === 'own' &&
      settings.ownCardsSet.length < 2
    ) {
      message.error('Should be two cards at least');
      return;
    }
    try {
      await settingsAPI.set(settings, gameInfo.id);
      await gameAPI.start(gameInfo.id);
      setGameStatus('started');
    } catch {
      message.error('Game was not started!');
    }
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
            <Col span={10} className="card_container__user-card">
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

          {(isUserAnOwner || gameInfo.tasks.length > 0) && (
            <Issues
              editable={isUserAnOwner}
              showAddIssueInput={isUserAnOwner}
              showDeleteBtn={isUserAnOwner}
              tasks={gameInfo.tasks}
            />
          )}
          {isUserAnOwner && (
            <Settings
              settings={settings}
              setSettings={setSettings}
              ownerRole={owner.userRole}
              gameId={gameInfo.id}
              userId={gameInfo.members[0].id}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LobbyPage;
