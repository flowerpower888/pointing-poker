import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import {
  GameInfo,
  GameStatus,
} from '../../models/GameInfoAggregate/GameInfoModel';
import LobbyPage from '../LobbyPage';
import GamePage from '../GamePage';

type GameParams = {
  gameId: string;
};

const MainPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { gameId } = useParams<GameParams>();
  const [gameData, setGameData] = useState({} as GameInfo);
  const [gameStatus, setGameStatus] = useState<GameStatus>('created');

  useEffect(() => {
    async function getOwnerStatus() {
      const gameInfo = await gameAPI.getGameInfo(gameId);
      setGameData(gameInfo.data);
      setGameStatus(gameInfo.data.status);
      setIsLoaded(true);
    }

    getOwnerStatus();
  }, [gameId]);

  return (
    <>
      {!isLoaded && <Preloader />}
      {isLoaded && gameStatus === 'created' && <LobbyPage info={gameData} />}
      {isLoaded && gameStatus === 'started' && <GamePage info={gameData} />}
    </>
  );
};

export default MainPage;
