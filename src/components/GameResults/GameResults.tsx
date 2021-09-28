import React from 'react';
import { Col } from 'antd';
import Statistics from '../GamePage/Statistics';
import IssueCard from '../LobbyPage/Issues/IssueCard';
import { RoundResult } from '../../models/RoundResult/RoundModel';
import { Issue } from '../../models/GameInfoAggregate/GameInfoModel';
import './gameResults.scss';

type GameResultsProps = {
  roundResults: RoundResult[] | null;
  tasks: Issue[];
};

const GameResults: React.FunctionComponent<GameResultsProps> = ({
  roundResults,
  tasks,
}) => (
  <div className="results">
    {roundResults &&
      roundResults?.map(roundResult => (
        <>
          <div className="issue-container">
            <IssueCard
              issue={tasks.find(task => task.id === roundResult.taskId)}
            />
          </div>
          <Col xl={12} lg={18} md={17} style={{ width: '100%' }}>
            <Statistics cards={roundResult.score.map(player => player.card)} />
          </Col>
        </>
      ))}
  </div>
);

export default GameResults;
