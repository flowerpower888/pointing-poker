import { Button, Col, Divider, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Issues from '../LobbyPage/Issues';
import UserCard from '../LobbyPage/UserCard';
import Timer from './Timer';
import Votes from './Votes';
import Cards from './Cards';
import Statistics from './Statistics';
import AdmittingUserPopup from './AdmittingUserPopup/AdmittingUserPopup';
import { CardModel, RoundResult } from '../../models/RoundResult/RoundModel';
import {
  GameInfo,
  GameStatus,
  Issue,
  Member,
} from '../../models/GameInfoAggregate/GameInfoModel';
import gameAPI from '../../api/gameAPI';
import memberAPI from '../../api/memberAPI';
import issuesAPI from '../../api/issuesAPI';
import votingAPI from '../../api/votingAPI';
import SocketHandler from '../../websockets-api/sockets';
import './gamePage.scss';

type Game = {
  info: GameInfo;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

function GamePage(props: Game): JSX.Element {
  const history = useHistory();
  const { info: gameInfo, setGameStatus } = props;
  const { members, settings } = gameInfo;
  const [waitingPlayer, setWaitingPlayer] = useState<Member | null>(null);

  useEffect(() => {
    setWaitingPlayer(
      members.find(member => member.userStatus === 'pending') || null,
    );
  }, [members]);

  const currentIssue =
    gameInfo.tasks.find(task => task.id === gameInfo.currentTaskId) ||
    gameInfo.tasks[0] ||
    null;
  const [roundStatus, setRoundStatus] = useState<string>('pending');
  const [btnText, setBtnText] = useState('Run round');
  const [roundResult, setRoundResult] = useState<RoundResult | null>(
    gameInfo.votes.find(task => task.taskId === currentIssue?.id) || null,
  );
  const [activeCard, setActiveCard] = useState<CardModel | null>(null);

  const players: Member[] = members.filter(
    member =>
      member.userRole !== 'observer' && member.userStatus === 'admitted',
  );
  const currentPlayer = gameInfo.members.find(
    member => member.id === localStorage.getItem('userId'),
  );

  useEffect(() => {
    const socketConnect = new SocketHandler(gameInfo.id);
    socketConnect.handleUpdateRoundStatus(setRoundStatus);
    socketConnect.handleUpdateRoundResult(setRoundResult);
  }, [gameInfo.id]);

  useEffect(() => {
    if (currentIssue) votingAPI.getVotesByTask(gameInfo.id, currentIssue?.id);
    setBtnText('Run round');
  }, [currentIssue, gameInfo.id]);

  const onRoundEnd = async () => {
    await votingAPI
      .sendVote(
        gameInfo.id,
        currentPlayer?.id || '',
        currentIssue.id,
        activeCard || { value: '?' },
      )
      .then(() =>
        votingAPI.getVotesByTask(gameInfo.id, currentIssue.id).then(res => {
          setRoundResult(res.data);
        }),
      );

    setActiveCard(null);
  };

  const onRoundStart = useCallback(() => {
    setRoundResult(null);
  }, []);

  useEffect(() => {
    gameAPI.setRoundStatus(gameInfo.id, roundStatus);

    switch (roundStatus) {
      case 'started':
        setBtnText('Stop round');
        onRoundStart();
        break;

      case 'stopped':
        setBtnText('Restart round');
        onRoundEnd();
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundStatus, gameInfo.id]);

  const onIssueClick = (issue: Issue) => {
    if (roundStatus !== 'started') {
      issuesAPI.setCurrent(issue.id, gameInfo.id);
    }
  };

  const onStopGame = () => {
    gameAPI.complete(gameInfo.id);
    setGameStatus('completed');
  };

  const onExitGame = async () => {
    if (currentPlayer?.id) {
      history.push('/');
      await memberAPI.delete(currentPlayer.id, gameInfo.id);
      localStorage.removeItem('userId');
    }
  };

  if (!currentPlayer) {
    history.push('/');
  }

  return (
    <div className="container">
      {currentPlayer && (
        <>
          <Row justify="space-between" style={{ marginBottom: 30 }}>
            <Col lg={15} sm={24} xs={24}>
              <h2 className="lobby-title">Spring planning</h2>
              <Row
                justify="space-between"
                align="bottom"
                style={{ marginBottom: 30 }}
              >
                <UserCard
                  id={currentPlayer.id}
                  imagePath={currentPlayer.imagePath}
                  firstName={currentPlayer.firstName}
                  lastName={currentPlayer.lastName}
                  userRole={currentPlayer.userRole}
                  jobPosition={currentPlayer.jobPosition}
                />
                {currentPlayer.isOwner ? (
                  <Button
                    className="gameBtn"
                    type="default"
                    size="large"
                    onClick={onStopGame}
                  >
                    Stop game
                  </Button>
                ) : (
                  <Button
                    className="gameBtn"
                    type="default"
                    size="large"
                    onClick={onExitGame}
                  >
                    Exit
                  </Button>
                )}
              </Row>

              {(currentPlayer.isOwner ||
                (!currentPlayer.isOwner && gameInfo.tasks.length > 0)) && (
                <Row align="middle" justify="space-between">
                  <Issues
                    editable={false}
                    onIssueClick={
                      currentPlayer.isOwner ? onIssueClick : undefined
                    }
                    currentIssue={currentIssue}
                    showAddIssueInput={currentPlayer.isOwner}
                    showDeleteBtn={currentPlayer.isOwner}
                    tasks={gameInfo.tasks}
                    direction="vertical"
                  />

                  <Col lg={12} sm={13}>
                    {settings.isTimerNeeded && (
                      <Timer
                        limit={settings.roundTime}
                        status={roundStatus}
                        setStatus={setRoundStatus}
                      />
                    )}

                    <Row>
                      {currentPlayer.isOwner && (
                        <Button
                          type="primary"
                          size="large"
                          disabled={
                            (settings.isTimerNeeded &&
                              roundStatus === 'started') ||
                            !currentIssue
                          }
                          onClick={() =>
                            setRoundStatus(prev =>
                              prev === 'started' ? 'stopped' : 'started',
                            )
                          }
                        >
                          {btnText}
                        </Button>
                      )}

                      {gameInfo.tasks.findIndex(
                        issue => issue.id === currentIssue.id,
                      ) !==
                        gameInfo.tasks.length - 1 &&
                        currentPlayer.isOwner && (
                          <Button
                            type="primary"
                            size="large"
                            onClick={() =>
                              issuesAPI.setCurrent(
                                gameInfo.tasks[
                                  gameInfo.tasks.indexOf(currentIssue) + 1
                                ].id,
                                gameInfo.id,
                              )
                            }
                            disabled={roundStatus === 'started'}
                            style={{ marginLeft: 10 }}
                          >
                            Next issue
                          </Button>
                        )}
                    </Row>
                  </Col>
                </Row>
              )}

              {roundResult && currentIssue && (
                <Col lg={24} md={16} className="statistics">
                  <h2 className="title">Statistics</h2>
                  <Statistics
                    cards={roundResult.score.map(player => player.card)}
                  />
                </Col>
              )}
            </Col>

            <Divider type="vertical" style={{ height: 'auto' }} />

            <Col lg={7} sm={24} xs={24}>
              <Votes
                players={players}
                score={currentIssue && roundResult?.score}
              />
            </Col>
          </Row>

          {currentPlayer.userRole !== 'observer' && (
            <Row className="cards-container" justify="center" gutter={[16, 16]}>
              <Cards
                cardsSet={settings.cardsSet}
                ownCardsSet={settings.ownCardsSet}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            </Row>
          )}
          {waitingPlayer && (
            <AdmittingUserPopup
              waitingPlayer={waitingPlayer}
              isVisible={waitingPlayer && currentPlayer.isOwner}
              setWaitingPlayer={setWaitingPlayer}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GamePage;
