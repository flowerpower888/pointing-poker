import React, { useEffect, useState } from 'react';
import './Card.scss';

type CardPropsType = {
  value: string;
  active?: string | null;
  setActive?: React.Dispatch<React.SetStateAction<string | null>>;
  imagePath?: string | undefined;
};

const Card: React.FunctionComponent<CardPropsType> = ({
  value,
  active,
  setActive,
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
      onClick={setActive ? () => setActive(value) : undefined}
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
