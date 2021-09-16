export type CardModel = {
  value: string;
  imagePath?: string;
};

export type Stats = {
  card: CardModel;
  percents: string;
};

export type RoundResult = {
  issue: string;
  score: {
    player: string;
    card: CardModel;
  }[];
  statistics?: Stats[];
};
