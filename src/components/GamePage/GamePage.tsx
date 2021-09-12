import { Button, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import issues from '../../shared/issues';
import Issues from '../LobbyPage/Issues';
import UserCard from '../LobbyPage/UserCard';
import Timer from './Timer';
import Votes from './Votes';
import members from '../LobbyPage/ConstantsHardCode';
import './GamePage.scss';

interface RoundResult {
  issue: string;
  score: {
    player: string;
    vote: number;
  }[];
}

const GamePage: React.FunctionComponent = () => {
  const [issueList, setIssueList] = useState(issues);
  const [currentIssue, setCurrentIssue] = useState<string>(issueList[0]);
  const [timerStatus, setTimerStatus] = useState<string>('stopped');
  const [score, setScore] = useState<number[] | null>(null);

  useEffect(() => {
    setScore(null);
  }, [currentIssue]);

  const getRoundResult = (): Promise<RoundResult> => {
    const random = () => Math.floor(Math.random() * 15) + 1;

    const roundResult = {
      issue: currentIssue,
      score: members.map(member => {
        const { firstName } = member;

        const memberScore = {
          player: firstName,
          vote: random(),
        };

        return memberScore;
      }),
    };

    return new Promise(resolve => {
      resolve(roundResult);
    });
  };

  const onIssueClick = (issue: string) => {
    if (timerStatus !== 'started') setCurrentIssue(issue);
  };

  const onRoundStart = () => {
    setScore(null);
  };

  const onRoundEnd = async () => {
    const roundScore = await getRoundResult().then(roundResult =>
      roundResult.score.reduce((acc: number[], cur) => [...acc, cur.vote], []),
    );

    setScore(roundScore);
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
              imagePath=""
              firstName="User"
              lastName="Name"
              userRole="scram master"
              jobPosition="student"
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
        </Col>

        <Divider type="vertical" style={{ height: 'auto' }} />

        <Col lg={7} sm={24} xs={24}>
          <Votes score={score} />
        </Col>
      </Row>
    </div>
  );
};

export default GamePage;
