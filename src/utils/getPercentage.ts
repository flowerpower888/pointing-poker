import { CardModel, Stats } from '../models/RoundResult/RoundModel';

const getPercentage = (cardValues: string[], cards: CardModel[]) => {
  let percentage: Stats[] = [];
  const uniqueCards = Array.from(new Set(cardValues));

  uniqueCards.forEach(cur => {
    const occurrences = cardValues.filter(cardValue => cardValue === cur);

    const percents = `${(
      (occurrences.length * 100) /
      cardValues.length
    ).toFixed(0)}%`;

    percentage = [
      ...percentage,
      { card: cards.filter(card => card.value === cur)[0], percents },
    ];
  });

  return percentage;
};

export default getPercentage;
