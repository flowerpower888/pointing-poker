import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, message } from 'antd';
import styles from './settingsCard.module.scss';
import closeCross from '../../../../assets/closeCross.png';
import plus from '../../../../assets/plus.png';
import edit from '../../../../assets/edit.png';
import { CardModel } from '../../../../models/RoundResult/RoundModel';

type SettingsCardPropsType = {
  card: CardModel;
  editCard?: (oldValue: string, newValue: string) => void;
  addNewCard?: (newValue: string) => void;
  isAddingCard?: boolean;
  allCards: CardModel[];
};

const SettingsCard: FC<SettingsCardPropsType> = ({
  card,
  addNewCard,
  editCard,
  isAddingCard = false,
  allCards,
}) => {
  const [newCardValue, setNewCardValue] = useState<string>(card.value);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const setCardValue = (inputValue: string) => {
    if (Number.isNaN(+inputValue)) {
      const errorText = 'Must be a number';
      setError(errorText);
      message.error(errorText);
    } else {
      setError('');
      setNewCardValue(inputValue);
    }
  };
  const onButtonClick = () => {
    if (!newCardValue) {
      const errorText = 'The empty field';
      setError(errorText);
      message.error(errorText);
    }

    if (allCards.some(c => c.value === newCardValue)) {
      const errorText = 'Cards should not repeat';
      setError(errorText);
      message.error(errorText);
      return;
    }

    if (!error && newCardValue && addNewCard) {
      addNewCard(newCardValue);
      setIsFlipped(false);
      setNewCardValue('');
    }

    if (!error && newCardValue && editCard) {
      editCard(card.value, newCardValue);
      setIsFlipped(false);
      setNewCardValue(newCardValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.front}>
          {!isAddingCard && (
            <img
              src={edit}
              alt="edit"
              className={styles.edit}
              role="presentation"
              onClick={() => setIsFlipped(true)}
            />
          )}
          {isAddingCard ? (
            <img
              src={plus}
              className={styles.cardImage}
              alt="add card"
              role="presentation"
              onClick={() => setIsFlipped(true)}
            />
          ) : (
            <h2 className={styles.cardValue}>{card.value}</h2>
          )}
        </div>
        <div className={styles.back}>
          <img
            src={closeCross}
            alt="close cross"
            className={styles.closeCross}
            onClick={() => setIsFlipped(false)}
            role="presentation"
          />
          <Input
            className={styles.input}
            onChange={event => {
              setCardValue(event.target.value);
            }}
            value={newCardValue}
          />
          <Button
            type="primary"
            className={styles.btn}
            htmlType="submit"
            onClick={onButtonClick}
            disabled={Boolean(error)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
