import { CardModel, RoundResult } from '../RoundResult/RoundModel';
import { Moment } from 'moment';

export type Member = {
  id?: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  imagePath: string;
  isOwner?: boolean;
  userRole: Role;
  userStatus?: UserStatus;
};

export type UserStatus = 'admitted' | 'pending' | 'rejected';
export type MemberProperties = {
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
  imagePath?: string;
  isOwner?: boolean;
  userRole?: Role;
  userStatus?: UserStatus;
};

export type Role = 'observer' | 'player';

export type GameStatus = 'created' | 'started' | 'completed' | 'canceled';

export type Issue = {
  id: string;
  title: string;
  link?: string;
  priority: IssuePriority;
};

export type IssueWithoutId = {
  title: string;
  link?: string;
  priority: IssuePriority;
};

export type IssuePriority = 'low' | 'medium' | 'high';

export type GameInfo = {
  tasks: Array<Issue>;
  currentTaskId?: string;
  _id: string;
  id: string;
  status: GameStatus;
  members: Array<Member>;
  votes: RoundResult[];
  chat: Array<Message>;
  settings: SettingsType;
};

export type SettingsType = {
  cardsSet: CardsSetType;
  ownCardsSet: CardModel[];
  isAutoEnteringPlayers: boolean;
  isChangingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  roundTime: number | Moment;
};

export type Message = {
  text: string;
  userId: string;
};

export type CardsSetType = 'fibonacci' | 'powersOfTwo' | 'own';
