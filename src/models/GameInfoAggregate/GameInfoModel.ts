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

export type Issue = {
  id: string;
  title: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
};

export type GameInfo = {
  tasks: Array<Issue>;
  _id: string;
  id: string;
  status: GameStatus;
  members: Array<Member>;
};
