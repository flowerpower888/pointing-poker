import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import KickByVotes from '../KickByVotes';

type GameParams = {
  gameId: string;
};

const MainPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isChatShown, setIsChatShown] = useState<boolean>(false);
  const { gameId } = useParams<GameParams>();
  const [gameData, setGameData] = useState({} as GameInfo);
  const [gameStatus, setGameStatus] = useState<GameStatus>('created');
  const [showKickProposal, setShowKickProposal] = useState<boolean>(false);
  const [playerToKick, setPlayerToKick] = useState<Member | null>(null);
  const [kickProposeBy, setKickProposeBy] = useState<Member | null>(null);
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
      socketConnect.handleUpdateChat(setGameData);
      socketConnect.handleKickPlayer(
        setShowKickProposal,
        setPlayerToKick,
        setKickProposeBy,
        gameInfo.data.members,
      );
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
      {isLoaded &&
        kickProposeBy &&
        playerToKick &&
        kickProposeBy.id !== localStorage.getItem('userId') &&
        KickByVotes(
          kickProposeBy,
          playerToKick,
          showKickProposal,
          setShowKickProposal,
        )}
    </div>
  );
};

export default MainPage;
