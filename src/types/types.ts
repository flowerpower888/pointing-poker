export type Member = {
  id?: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  imagePath: string;
  isOwner?: boolean;
  role: Role;
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

export type Card = {
  value: string;
  imagePath?: string;
};
