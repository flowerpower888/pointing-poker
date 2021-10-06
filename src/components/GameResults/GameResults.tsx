import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Col } from 'antd';
import Statistics from '../GamePage/Statistics';
import IssueCard from '../LobbyPage/Issues/IssueCard';
import { RoundResult } from '../../models/RoundResult/RoundModel';
import { Issue } from '../../models/GameInfoAggregate/GameInfoModel';
import getPercentage from '../../utils/getPercentage';
import votingAPI from '../../api/votingAPI';
import './gameResults.scss';

type GameResultsProps = {
  tasks: Issue[];
};

const GameResults: React.FunctionComponent<GameResultsProps> = ({ tasks }) => {
  const [roundResults, setRoundResults] = useState<RoundResult[] | null>(null);

  useEffect(() => {
    const getRoundResults = async () => {
      const gameId = localStorage.getItem('gameId');

      if (gameId)
        await votingAPI.getVotes(gameId).then(res => setRoundResults(res.data));
    };

    getRoundResults();
  }, []);

  return (
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
              <Statistics
                cards={roundResult.score.map(player => player.card)}
              />
            </Col>
          </>
        ))}
      <CSVLink
        data={[
          ['issue', 'votes'],
          ...(roundResults?.map(roundResult => {
            const cards = roundResult.score.map(player => player.card);

            return [
              tasks.find(task => task.id === roundResult.taskId)?.title,
              getPercentage(
                cards.map(card => card.value),
                cards,
              )
                .map(result => `${result.card.value}: ${result.percents}`)
                .join(', '),
            ];
          }) || []),
        ]}
        filename="results.csv"
        className="ant-btn ant-btn-primary ant-btn-lg result-btn"
      >
        Download results
      </CSVLink>
    </div>
  );
};

export default GameResults;
