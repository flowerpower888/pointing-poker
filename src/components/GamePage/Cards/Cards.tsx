import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { CardsSetType } from '../../../models/GameInfoAggregate/GameInfoModel';
import { CardModel } from '../../../models/RoundResult/RoundModel';
import Card from './Card';

type CardsPropsType = {
  cardsSet: CardsSetType;
  ownCardsSet: Array<CardModel>;
  activeCard: CardModel | null;
  setActiveCard: React.Dispatch<React.SetStateAction<CardModel | null>>;
};

const Cards: React.FunctionComponent<CardsPropsType> = ({
  cardsSet,
  ownCardsSet,
  activeCard,
  setActiveCard,
}) => {
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
  }, [cardsSet]);

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
