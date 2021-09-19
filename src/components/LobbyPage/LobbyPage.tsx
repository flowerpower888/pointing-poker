import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './lobbyPage.scss';
import LobbyPageScramMaster from './LobbyPageScramMaster';
import LobbyPagePlayers from './LobbyPagePlayers';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import { GameInfo } from '../../models/GameInfoAggregate/GameInfoModel';

type Game = {
  info: GameInfo;
};

function LobbyPage(props: Game): JSX.Element {
  const { info: gameInfo } = props;
  const ownerId = gameInfo.members.filter(el => el.isOwner)[0].id;
  const isUserAnOwner = ownerId === localStorage.getItem('userId');
  return (
    <div className="lobby-page">
      {isUserAnOwner ? (
        <LobbyPageScramMaster info={gameInfo} />
      ) : (
        <LobbyPagePlayers info={gameInfo} />
      )}
    </div>
  );
}

export default LobbyPage;
