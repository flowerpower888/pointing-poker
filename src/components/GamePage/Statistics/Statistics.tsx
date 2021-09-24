import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardModel, Stats } from '../../../models/RoundResult/RoundModel';
import Card from '../Cards/Card';
import './statistics.scss';

type StatPropsType = {
  cards: CardModel[];
};

const Statistics: React.FunctionComponent<StatPropsType> = ({ cards }) => {
  const [statistics, setStatistics] = useState<Stats[] | null>(null);

  useEffect(() => {
    const getPercentage = (cardValues: string[]) => {
      let percentage: Stats[] = [];
      const uniqueCards = Array.from(new Set(cardValues));

      uniqueCards.forEach(cur => {
        const occurrences = cardValues.filter(cardValue => cardValue === cur);

        const percents = `${(
          (occurrences.length * 100) /
          cardValues.length
        ).toFixed(0)}%`;

        percentage = [
          ...percentage,
          { card: cards.filter(card => card.value === cur)[0], percents },
        ];
      });

      return percentage;
    };

    setStatistics(getPercentage(cards.map(card => card.value)));
  }, [cards]);

  return (
    <div className="statistics">
      <h2 className="title">Statistics</h2>
      <Row gutter={[16, 16]} justify="center">
        {statistics
          ?.sort((a, b) => parseInt(b.percents, 10) - parseInt(a.percents, 10))
          .map(vote => {
            const { card, percents } = vote;

            return (
              <Col lg={4} sm={5} xs={6} key={card.value}>
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
