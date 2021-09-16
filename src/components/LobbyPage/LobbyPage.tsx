import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './lobbyPage.css';
import LobbyPageScramMaster from './LobbyPageScramMaster';
import LobbyPagePlayers from './LobbyPagePlayers';
import gameAPI from '../../api/gameAPI';
import { GameInfo } from '../../types/types';

type GameParams = {
  gameId: string;
};

function LobbyPage(): JSX.Element {
  const { gameId } = useParams<GameParams>();
  const [isOwner, setIsOwner] = useState(false);
  const [gameData, setGameData] = useState({} as GameInfo);
  const [isLoading, setIsLoading] = useState(true);
  // const [gameStatus, setGameStatus] = useState('created');
  useEffect(() => {
    async function getOwnerStatus() {
      const gameInfo = await gameAPI.getGameInfo(gameId);
      setGameData(gameInfo.data);
      const owner = gameInfo.data.members.filter(el => el.isOwner)[0].id;
      setIsOwner(owner === localStorage.getItem('userId'));
      // setGameStatus(gameInfo.data.status);
      setIsLoading(false);
    }
    getOwnerStatus();
  }, []);
  // TODO: add checking game status to render lobby or game page
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="lobby-page">
      {isOwner ? (
        <LobbyPageScramMaster info={gameData} />
      ) : (
        <LobbyPagePlayers info={gameData} />
      )}
    </div>
  );
}

export default LobbyPage;
