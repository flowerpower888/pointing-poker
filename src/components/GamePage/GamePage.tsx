import { Button, Row } from 'antd';
import React, { useState } from 'react';
import issues from '../../shared/issues';
import Issues from '../LobbyPage/Issues';
import UserCard from '../LobbyPage/UserCard';
import Timer from './Timer';

const GamePage: React.FunctionComponent = () => {
  const [issueList, setIssueList] = useState(issues);
  const [currentIssue, setCurrentIssue] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<string>('stopped');

  const onIssueClick = (index: number) => {
    if (timerStatus !== 'started') setCurrentIssue(index);
  };

  return (
    <div className="container">
      <h2 className="lobby-title">Spring planning</h2>
      <Row justify="space-between" align="bottom" style={{ marginBottom: 30 }}>
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
          />
          {currentIssue !== issueList.length - 1 && (
            <Button
              type="primary"
              size="large"
              onClick={() => setCurrentIssue(prev => prev + 1)}
              disabled={timerStatus === 'started'}
              style={{ marginTop: 60, marginLeft: 10 }}
            >
              Next issue
            </Button>
          )}
        </Row>
      </Row>
    </div>
  );
};

export default GamePage;
