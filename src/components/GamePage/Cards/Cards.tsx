import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { Card } from '../../../types/types';
import './Cards.scss';

const Cards: React.FunctionComponent = () => {
  const [active, setActive] = useState<string | null>(null);
  const [cardSet, setCardSet] = useState<Card[] | null>(null);

  useEffect(() => {
    const loadImage = (name: string): Promise<string> =>
      import(`../../../assets/cards/${name}`).then(image => image.default);

    const fetchCardSet = () =>
      fetch('./cardSet.json')
        .then(res => res.json())
        .then(async (set: Card[]) => {
          setCardSet(
            await Promise.all(
              set.map(async card => {
                const { value, imagePath } = card;
                if (imagePath) {
                  return { value, imagePath: await loadImage(imagePath) };
                }
                return card;
              }),
            ),
          );
        });

    fetchCardSet();
  }, []);

  return (
    <>
      {cardSet &&
        cardSet.map(card => (
          <Col lg={4} sm={5} xs={5}>
            <div
              className={`card ${card.value === active ? 'active' : ''}`}
              onClick={() => setActive(card.value)}
              role="presentation"
            >
              {card.imagePath ? (
                <img src={card.imagePath} className="card-image" alt="card" />
              ) : (
                <h2 className="card-value">{card.value}</h2>
              )}
            </div>
          </Col>
        ))}
    </>
  );
};

export default Cards;
