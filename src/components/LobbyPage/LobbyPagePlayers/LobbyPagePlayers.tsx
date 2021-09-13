import * as React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './lobbyPagePlayers.css';
import MembersList from '../Members/MembersList';
import UserCard from '../UserCard/UserCard';
// eslint-disable-next-line import/no-named-as-default
import members from '../ConstantsHardCode';

function LobbyPagePlayers(): JSX.Element {
  return (
    <>
      <h2 className="lobby-title"> Spring planning</h2>
      <UserCard
        isOwner
        imagePath=""
        firstName="User"
        lastName="Name"
        userRole="observer"
        jobPosition="student"
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

export default LobbyPagePlayers;
