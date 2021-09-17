import { Col, Row } from 'antd';
import React from 'react';
import { Stats } from '../../../models/RoundResult/RoundModel';
import Card from '../Cards/Card';
import './statistics.scss';

type StatPropsType = {
  statistics: Stats[] | undefined;
};

const Statistics: React.FunctionComponent<StatPropsType> = ({ statistics }) => {
  console.log(statistics);

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
