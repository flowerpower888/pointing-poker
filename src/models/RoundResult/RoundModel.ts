export type CardModel = {
  id: string;
  value: string;
  imagePath?: string;
};

export type Stats = {
  card: CardModel;
  percents: string;
};

export type TaskScore = {
  playerId?: string;
  card: CardModel;
};

export type RoundResult = {
  taskId: string;
  score: TaskScore[];
  statistics?: Stats[];
};
