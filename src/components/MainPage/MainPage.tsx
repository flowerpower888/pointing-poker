import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { WechatOutlined } from '@ant-design/icons';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import {
  GameInfo,
  GameStatus,
} from '../../models/GameInfoAggregate/GameInfoModel';
import SocketHandler from '../../websockets-api/sockets';
import LobbyPage from '../LobbyPage';
import GamePage from '../GamePage';
import Chat from '../Chat';
import styles from './mainPage.module.scss';

type GameParams = {
  gameId: string;
};

const MainPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isChatShown, setIsChatShown] = useState<boolean>(false);
  const { gameId } = useParams<GameParams>();
  const [gameData, setGameData] = useState({} as GameInfo);
  const [gameStatus, setGameStatus] = useState<GameStatus>('created');

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
      socketConnect.handleUpdateChat(setGameData);
      setIsLoaded(true);
    }

    getGameStatus();
  }, [gameId]);

  return (
    <div className="main-page">
      {isLoaded && (
        <WechatOutlined
          onClick={() => setIsChatShown(true)}
          className={styles.openingIcon}
        />
      )}
      {!isLoaded ? (
        <Preloader />
      ) : gameStatus === 'started' ? (
        <GamePage info={gameData} setGameStatus={setGameStatus} />
      ) : (
        <LobbyPage info={gameData} setGameStatus={setGameStatus} />
      )}
      {isLoaded && (
        <Chat
          messages={gameData.chat}
          members={gameData.members}
          setIsChatShown={setIsChatShown}
          isChatShown={isChatShown}
        />
      )}
    </div>
  );
};

export default MainPage;
