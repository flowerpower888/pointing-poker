import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import {
  GameInfo,
  GameStatus,
} from '../../models/GameInfoAggregate/GameInfoModel';
import SocketHandler from '../../websockets-api/sockets';
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
  const history = useHistory();

  useEffect(() => {
    async function getGameStatus() {
      const gameInfo = await gameAPI.getGameInfo(gameId);
      setGameData(gameInfo.data);
      setGameStatus(gameInfo.data.status);
      const socketConnect = new SocketHandler(gameId);
      socketConnect.handleUpdateMembers(setGameData);
      socketConnect.handleUpdateStatus(setGameData, setGameStatus);
      socketConnect.handleUpdateIssues(setGameData);
      socketConnect.handleUpdateCurrentIssue(setGameData);
      setIsLoaded(true);
    }
    getGameStatus();
  }, [gameId]);

  useEffect(() => {
    if (
      gameData.members &&
      !gameData.members.find(el => el.id === localStorage.getItem('userId'))
    ) {
      history.push('/');
    }
  }, [gameData]);

  return (
    <div className="main-page">
      {!isLoaded ? (
        <Preloader />
      ) : gameStatus === 'started' ? (
        <GamePage info={gameData} setGameStatus={setGameStatus} />
      ) : (
        <LobbyPage info={gameData} setGameStatus={setGameStatus} />
      )}
    </div>
  );
};

export default MainPage;
