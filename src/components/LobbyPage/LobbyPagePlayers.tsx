import * as React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './lobbyPage.css';
import MembersList from './MembersList';
import UserCard, { UserData } from './UserCard';

const members: UserData[] = [
  {
    firstName: 'Kate',
    lastName: 'Matveyeva',
    position: 'student',
    userRole: 'player',
  },
  {
    firstName: 'Sergey',
    lastName: 'Mouk',
    position: 'lead developer',
    userRole: 'observer',
  },
  {
    firstName: 'Nikola',
    lastName: 'Mouk',
    position: 'junior director',
    userRole: 'player',
    avatar:
      'https://image.freepik.com/free-vector/profile-icon-male-avatar_48369-2131.jpg',
  },
];

function lobbyPagePlayers(): JSX.Element {
  return (
    <>
      <h2 className="lobby-title"> Spring planning</h2>
      <UserCard
        avatar=""
        firstName="User"
        lastName="Name"
        userRole="scram master"
        position="student"
      />
      <div className="lobby-page_btn-container">
        <Button className="lobby-exit-btn" type="default" size="large">
          Exit
        </Button>
      </div>
      <MembersList users={members} />
    </>
  );
}

export default lobbyPagePlayers;
