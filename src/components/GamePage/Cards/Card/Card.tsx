import React, { useEffect, useState } from 'react';
import { CardModel } from '../../../../models/RoundResult/RoundModel';
import './card.scss';

type CardPropsType = {
  value: string;
  active?: string | null;
  setActiveCard?: React.Dispatch<React.SetStateAction<CardModel | null>>;
  imagePath?: string;
};

const Card: React.FunctionComponent<CardPropsType> = ({
  value,
  active,
  setActiveCard,
  imagePath,
}) => {
  const [cardImage, setCardImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = (name: string): Promise<void> =>
      import(`../../../../assets/cards/${name}`).then(image =>
        setCardImage(image.default),
      );

    if (imagePath) {
      loadImage(imagePath);
    }
  }, [imagePath]);

  return (
    <div
      className={`card ${value === active ? 'active' : ''}`}
      onClick={
        setActiveCard ? () => setActiveCard({ value, imagePath }) : undefined
      }
      role="presentation"
    >
      {cardImage ? (
        <img src={cardImage} className="card-image" alt="card" />
      ) : (
        <h2 className="card-value">{value}</h2>
      )}
    </div>
  );
};

export default Card;
