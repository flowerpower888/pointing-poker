import { Button, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Issues from '../LobbyPage/Issues';
import UserCard from '../LobbyPage/UserCard';
import Timer from './Timer';
import Votes from './Votes';
import Cards from './Cards';
import Statistics from './Statistics';
import { RoundResult, CardModel } from '../../models/RoundResult/RoundModel';
import {
  GameInfo,
  GameStatus,
  Issue,
  Member,
} from '../../models/GameInfoAggregate/GameInfoModel';
import './gamePage.scss';
import gameAPI from '../../api/gameAPI';
import memberAPI from '../../api/memberAPI';
import SocketHandler from '../../websockets-api/sockets';

type Game = {
  info: GameInfo;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

function GamePage(props: Game): JSX.Element {
  const history = useHistory();
  const { info: gameInfo, setGameStatus } = props;
  const { members } = gameInfo;

  const [currentIssue, setCurrentIssue] = useState<Issue>(gameInfo.tasks[0]);
  const [timerStatus, setTimerStatus] = useState<string>('stopped');
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [players, setPlayers] = useState<Member[]>(
    members.filter(member => member.userRole !== 'observer'),
  );
  const socketConnect = new SocketHandler(gameInfo.id);
  socketConnect.handlerUpdateTimer(setTimerStatus);
  const currentPlayer = gameInfo.members.filter(
    member => member.id === localStorage.getItem('userId'),
  )[0];

  useEffect(() => {
    setRoundResult(null);
  }, [currentIssue]);

  const onIssueClick = (issue: Issue) => {
    if (timerStatus !== 'started') setCurrentIssue(issue);
  };

  const onRoundStart = () => {
    setRoundResult(null);
  };

  const onRoundEnd = async () => {
    const getRoundResult = async (): Promise<RoundResult> => {
      const cards = await fetch('/cardSet.json').then(res => res.json());

      const result: RoundResult = {
        issue: currentIssue.id,
        score: players
          .filter(player => player.userRole !== 'observer')
          .map(player => {
            const { id } = player;

            const playerScore = {
              playerId: id,
              card: cards[Math.floor(Math.random() * cards.length)],
            };

            return playerScore;
          }),
      };

      return new Promise(resolve => {
        resolve(result);
      });
    };

    setRoundResult(await getRoundResult());
  };

  const onPlayerKick = async (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));

    if (roundResult) {
      setRoundResult({
        ...roundResult,
        score: roundResult?.score.filter(
          playerScore => playerScore.playerId !== id,
        ),
      });
    }

    await memberAPI.delete(id, gameInfo.id);
  };

  const onStopGame = () => {
    gameAPI.complete(gameInfo.id);
    setGameStatus('completed');
  };

  const onExitGame = async () => {
    if (currentPlayer.id) {
      history.push('/');
      await memberAPI.delete(currentPlayer.id, gameInfo.id);
      localStorage.removeItem('userId');
    }
  };

  return (
    <div className="container">
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
              <Button type="default" size="large" onClick={onStopGame}>
                Stop game
              </Button>
            ) : (
              <Button type="default" size="large" onClick={onExitGame}>
                Exit
              </Button>
            )}
          </Row>

          <Row align="middle" justify="space-between">
            <Issues
              editable={false}
              onIssueClick={currentPlayer.isOwner ? onIssueClick : undefined}
              currentIssue={currentIssue}
              showAddIssueInput={currentPlayer.isOwner}
              showDeleteBtn={currentPlayer.isOwner}
              tasks={gameInfo.tasks}
            />

            <Col span={12}>
              <Row justify="center">
                <Timer
                  limit={3}
                  status={timerStatus}
                  setStatus={setTimerStatus}
                  currentIssue={currentIssue}
                  onRoundEnd={onRoundEnd}
                  onRoundStart={onRoundStart}
                  showTimerBtn={currentPlayer.isOwner}
                />
                {gameInfo.tasks.findIndex(
                  issue => issue.id === currentIssue.id,
                ) !==
                  gameInfo.tasks.length - 1 &&
                  currentPlayer.isOwner && (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() =>
                        setCurrentIssue(
                          prev =>
                            gameInfo.tasks[gameInfo.tasks.indexOf(prev) + 1],
                        )
                      }
                      disabled={timerStatus === 'started'}
                      style={{ marginTop: 60, marginLeft: 10 }}
                    >
                      Next issue
                    </Button>
                  )}
              </Row>
            </Col>
          </Row>

          {roundResult && <Statistics roundResult={roundResult} />}
        </Col>

        <Divider type="vertical" style={{ height: 'auto' }} />

        <Col lg={7} sm={24} xs={24}>
          <Votes
            players={players}
            score={roundResult?.score.map(player => player.card.value)}
            onPlayerKick={onPlayerKick}
          />
        </Col>
      </Row>

      {currentPlayer.userRole !== 'observer' && (
        <Row className="cards-container" justify="center" gutter={[16, 16]}>
          <Cards />
        </Row>
      )}
    </div>
  );
}

export default GamePage;
