import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './lobbyPage.scss';
import LobbyPageScramMaster from './LobbyPageScramMaster';
import LobbyPagePlayers from './LobbyPagePlayers';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import { GameInfo } from '../../models/GameInfoAggregate/GameInfoModel';
import SocketHandler from '../../websockets-api/sockets';

type GameParams = {
  gameId: string;
};

function LobbyPage(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { gameId } = useParams<GameParams>();
  const [isOwner, setIsOwner] = useState(false);
  const [gameData, setGameData] = useState({} as GameInfo);
  let socketConnect: SocketHandler;
  // const [gameStatus, setGameStatus] = useState('created');
  useEffect(() => {
    async function getOwnerStatus() {
      const gameInfo = await gameAPI.getGameInfo(gameId);
      setGameData(gameInfo.data);
      const owner = gameInfo.data.members.filter(el => el.isOwner)[0].id;
      setIsOwner(owner === localStorage.getItem('userId'));
      setIsLoaded(true);
      // setGameStatus(gameInfo.data.status);
      socketConnect = new SocketHandler(gameId);
      socketConnect.handleAddMember(gameData, setGameData);
    }
    getOwnerStatus();
  }, []);
  // TODO: add checking game status to render lobby or game page
  return (
    <div className="lobby-page">
      {!isLoaded ? (
        <Preloader />
      ) : isOwner ? (
        <LobbyPageScramMaster info={gameData} />
      ) : (
        <LobbyPagePlayers info={gameData} />
      )}
    </div>
  );
}

export default LobbyPage;
