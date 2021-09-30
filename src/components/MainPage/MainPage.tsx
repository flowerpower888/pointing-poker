import * as React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { WechatOutlined } from '@ant-design/icons';
import gameAPI from '../../api/gameAPI';
import Preloader from '../common/Preloader/Preloader';
import {
  GameInfo,
  GameStatus,
  Member,
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
  const [currentPlayer, setCurrentPlayer] = useState<Member | null>(null);
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
      socketConnect.handleUpdateSettings(setGameData);
      setCurrentPlayer(
        gameInfo.data.members.filter(
          member => member.id === localStorage.getItem('userId'),
        )[0],
      );
      socketConnect.handleUpdateChat(setGameData);
      setIsLoaded(true);
    }
    getGameStatus();
  }, [gameId]);

  useEffect(() => {
    if (gameData && gameData.members) {
      setCurrentPlayer(
        gameData.members.filter(
          member => member.id === localStorage.getItem('userId'),
        )[0] || null,
      );
    }
  }, [gameData]);

  useEffect(() => {
    if (
      gameData.members &&
      !gameData.members.find(el => el.id === localStorage.getItem('userId'))
    ) {
      history.push('/');
    }
  }, [gameData]);

  if (currentPlayer && currentPlayer.userStatus === 'rejected') {
    return <Redirect to="/" />;
  }

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
      ) : gameStatus === 'started' &&
        currentPlayer?.userStatus !== 'pending' ? (
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
