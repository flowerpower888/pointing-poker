import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardModel, Stats } from '../../../models/RoundResult/RoundModel';
import getPercentage from '../../../utils/getPercentage';
import Card from '../Cards/Card';
import './statistics.scss';

type StatPropsType = {
  cards: CardModel[];
};

const Statistics: React.FunctionComponent<StatPropsType> = ({ cards }) => {
  const [statistics, setStatistics] = useState<Stats[] | null>(null);

  useEffect(() => {
    setStatistics(
      getPercentage(
        cards.map(card => card.value),
        cards,
      ).sort((a, b) => parseInt(b.percents, 10) - parseInt(a.percents, 10)),
    );
  }, [cards]);

  return (
    <Row gutter={[16, 16]} justify="center">
      {statistics?.map(vote => {
        const { card, percents } = vote;

        return (
          <Col lg={4} sm={5} xs={6} key={card.value}>
            <p className="percents">{percents}</p>
            <Card value={card.value} imagePath={card.imagePath} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Statistics;
