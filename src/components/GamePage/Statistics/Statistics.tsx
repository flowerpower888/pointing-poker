import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  CardModel,
  RoundResult,
  Stats,
} from '../../../models/RoundResult/RoundModel';
import Card from '../Cards/Card';
import './statistics.scss';

type StatPropsType = {
  roundResult: RoundResult;
};

const Statistics: React.FunctionComponent<StatPropsType> = ({
  roundResult,
}) => {
  const [statistics, setStatistics] = useState<Stats[] | null>(null);

  useEffect(() => {
    const getPercentage = (cards: CardModel[]) => {
      let percentage: { card: CardModel; percents: string }[] = [];
      const uniqueCards = Array.from(new Set(cards));

      uniqueCards.forEach(cur => {
        const occurrences = cards.filter(card => card.value === cur.value);

        const percents = `${((occurrences.length * 100) / cards.length).toFixed(
          0,
        )}%`;

        percentage = [...percentage, { card: cur, percents }];
      });

      return percentage;
    };

    setStatistics(getPercentage(roundResult.score.map(player => player.card)));
  }, [roundResult.score]);

  return (
    <div className="statistics">
      <h2 className="title">Statistics</h2>
      <Row gutter={[16, 16]} justify="center">
        {statistics
          ?.sort((a, b) => parseInt(b.percents, 10) - parseInt(a.percents, 10))
          .map(vote => {
            const { card, percents } = vote;

            return (
              <Col lg={4} sm={5} xs={6}>
                <p className="percents">{percents}</p>
                <Card value={card.value} imagePath={card.imagePath} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Statistics;
