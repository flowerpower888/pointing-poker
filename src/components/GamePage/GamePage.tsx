import { Button, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import issues from '../../utils/issues';
import Issues from '../LobbyPage/Issues';
import UserCard from '../LobbyPage/UserCard';
import Timer from './Timer';
import Votes from './Votes';
import Cards from './Cards';
import Statistics from './Statistics';
import { RoundResult } from '../../models/RoundResult/RoundModel';
import { GameInfo, Member } from '../../models/GameInfoAggregate/GameInfoModel';
import './gamePage.scss';

type Game = {
  info: GameInfo;
};

function GamePage(props: Game): JSX.Element {
  const { info } = props;
  const { members } = info;

  const [issueList, setIssueList] = useState(issues);
  const [currentIssue, setCurrentIssue] = useState<string>(issueList[0]);
  const [timerStatus, setTimerStatus] = useState<string>('stopped');
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [players, setPlayers] = useState<Member[]>(
    members.filter(member => member.userRole !== 'observer'),
  );
  const scrumMaster = info.members.filter(el => el.isOwner)[0];

  useEffect(() => {
    setRoundResult(null);
  }, [currentIssue]);

  const onIssueClick = (issue: string) => {
    if (timerStatus !== 'started') setCurrentIssue(issue);
  };

  const onRoundStart = () => {
    setRoundResult(null);
  };

  const onRoundEnd = async () => {
    const getRoundResult = async (): Promise<RoundResult> => {
      const cards = await fetch('/cardSet.json').then(res => res.json());

      const result: RoundResult = {
        issue: currentIssue,
        score: players
          .filter(player => player.userRole !== 'observer')
          .map(player => {
            const { firstName } = player;

            const playerScore = {
              player: firstName,
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

  const onPlayerKick = async (firstName: string) => {
    setPlayers(prev => prev.filter(player => player.firstName !== firstName));

    if (roundResult) {
      setRoundResult({
        ...roundResult,
        score: roundResult?.score.filter(
          playerScore => playerScore.player !== firstName,
        ),
      });
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
              imagePath={scrumMaster.imagePath}
              firstName={scrumMaster.firstName}
              lastName={scrumMaster.lastName}
              userRole={scrumMaster.userRole}
              jobPosition={scrumMaster.jobPosition}
            />

            <Button type="default" size="large">
              Stop game
            </Button>
          </Row>

          <Row align="middle">
            <Issues
              issueList={issueList}
              setIssueList={setIssueList}
              editable={false}
              onIssueClick={onIssueClick}
              currentIssue={currentIssue}
            />

            <Row>
              <Timer
                limit={3}
                status={timerStatus}
                setStatus={setTimerStatus}
                currentIssue={currentIssue}
                onRoundEnd={onRoundEnd}
                onRoundStart={onRoundStart}
              />
              {issueList.indexOf(currentIssue) !== issueList.length - 1 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    setCurrentIssue(
                      prev => issueList[issueList.indexOf(prev) + 1],
                    )
                  }
                  disabled={timerStatus === 'started'}
                  style={{ marginTop: 60, marginLeft: 10 }}
                >
                  Next issue
                </Button>
              )}
            </Row>
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

      {/* <Row className="cards-container" justify="center" gutter={[16, 16]}>
        <Cards />
      </Row> */}
    </div>
  );
}

export default GamePage;
