import * as React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import MembersList from '../Members/MembersList';
import UserCard from '../UserCard/UserCard';
import { GameInfo } from '../../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPagePlayers.scss';

type Game = {
  info: GameInfo;
};

function LobbyPagePlayers(props: Game): JSX.Element {
  const { info } = props;
  console.log(info);
  const scrumMaster = info.members.filter(el => el.isOwner)[0];
  const players = info.members.filter(el => !el.isOwner);
  return (
    <>
      <h2 className="lobby-title"> Spring planning</h2>
      <UserCard
        isOwner
        imagePath={scrumMaster.imagePath}
        firstName={scrumMaster.firstName}
        lastName={scrumMaster.lastName}
        userRole={scrumMaster.userRole}
        jobPosition={scrumMaster.jobPosition}
      />
      <div className="lobby-page_btn-container">
        <Button className="lobby-exit-btn" type="default" size="large">
          Exit
        </Button>
      </div>
      <MembersList users={players} />
    </>
  );
}

export default LobbyPagePlayers;
