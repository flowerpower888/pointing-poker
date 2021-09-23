export type CardModel = {
  value: string;
  imagePath?: string;
};

export type Stats = {
  card: CardModel;
  percents: string;
};

export type RoundResult = {
  taskId: string;
  score: {
    playerId?: string;
    card: CardModel;
  }[];
  statistics?: Stats[];
};
