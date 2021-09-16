import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardModel } from '../../../models/RoundResult/RoundModel';
import Card from './Card';

const Cards: React.FunctionComponent = () => {
  const [active, setActive] = useState<string | null>(null);
  const [cardSet, setCardSet] = useState<CardModel[] | null>(null);

  useEffect(() => {
    const fetchCardSet = () =>
      fetch('./cardSet.json')
        .then(res => res.json())
        .then(async (set: CardModel[]) => {
          setCardSet(set);
        });

    fetchCardSet();
  }, []);

  return (
    <>
      {cardSet &&
        cardSet.map(card => {
          const { value, imagePath } = card;

          return (
            <Col lg={4} sm={5} xs={5}>
              <Card
                value={value}
                active={active}
                setActive={setActive}
                imagePath={imagePath}
              />
            </Col>
          );
        })}
    </>
  );
};

export default Cards;
