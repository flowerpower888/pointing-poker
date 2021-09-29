import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardsSetType } from '../../../models/GameInfoAggregate/GameInfoModel';
import { CardModel } from '../../../models/RoundResult/RoundModel';
import Card from './Card';

type CardsPropsType = {
  cardsSet: CardsSetType;
  ownCardsSet: Array<CardModel>;
};
const Cards: React.FunctionComponent<CardsPropsType> = ({
  cardsSet,
  ownCardsSet,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [cardSet, setCardSet] = useState<CardModel[]>(ownCardsSet);

  useEffect(() => {
    const fetchCardSet = () => {
      if (cardsSet === 'own') return;
      fetch(`./${cardsSet}.json`)
        .then(res => res.json())
        .then(async (set: CardModel[]) => {
          setCardSet(set);
        });
    };

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
