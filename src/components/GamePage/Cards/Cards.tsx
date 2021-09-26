import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardModel } from '../../../models/RoundResult/RoundModel';
import Card from './Card';

type CardsPropsType = {
  activeCard: CardModel | null;
  setActiveCard: React.Dispatch<React.SetStateAction<CardModel | null>>;
};

const Cards: React.FunctionComponent<CardsPropsType> = ({
  activeCard,
  setActiveCard,
}) => {
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
                imagePath={imagePath}
                active={activeCard?.value}
                setActiveCard={setActiveCard}
              />
            </Col>
          );
        })}
    </>
  );
};

export default Cards;
