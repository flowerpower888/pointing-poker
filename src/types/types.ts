export type Member = {
  id?: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  imagePath: string;
  isOwner?: boolean;
  userRole: Role;
};

export type Role = 'observer' | 'player';

export type GameStatus = 'created' | 'started' | 'completed';

export type GameInfo = {
  tasks: any;
  _id: string;
  id: string;
  status: GameStatus;
  members: Array<Member>;
};

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
