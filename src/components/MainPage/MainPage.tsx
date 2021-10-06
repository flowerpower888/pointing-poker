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
import GameResults from '../GameResults';
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
  const [playerToKickId, setPlayerToKickId] = useState<string | null>(null);
  const [kickProposeById, setKickProposeById] = useState<string | null>(null);
  const [playerToKick, setPlayerToKick] = useState<Member | null>(null);
  const [kickProposeBy, setKickProposeBy] = useState<Member | null>(null);
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
      socketConnect.handleUpdateVotes(setGameData);
      socketConnect.handleUpdateChat(setGameData);
      socketConnect.handleKickPlayer(setPlayerToKickId, setKickProposeById);
      setIsLoaded(true);
    }

    getGameStatus();
  }, [gameId]);

  useEffect(() => {
    if (gameData.members) {
      const foundCurrentMember = gameData.members.find(
        el => el.id === localStorage.getItem('userId'),
      );
      if (foundCurrentMember) {
        setCurrentPlayer(foundCurrentMember);
      } else {
        history.push('/');
      }
    }
  }, [gameData, history]);

  useEffect(() => {
    const toKick = gameData.members?.find(el => el.id === playerToKickId);
    const proposeBy = gameData.members?.find(el => el.id === kickProposeById);
    if (toKick && proposeBy) {
      setPlayerToKick(toKick);
      setKickProposeBy(proposeBy);
      setShowKickProposal(true);
    }
  }, [playerToKickId, kickProposeById, gameData.members]);

  if (currentPlayer && currentPlayer.userStatus === 'rejected') {
    return <Redirect to="/" />;
  }
  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <div className="main-page">
      <WechatOutlined
        onClick={() => setIsChatShown(true)}
        className={styles.openingIcon}
      />
      <Chat
        messages={gameData.chat}
        members={gameData.members}
        setIsChatShown={setIsChatShown}
        isChatShown={isChatShown}
      />

      {(gameStatus === 'created' ||
        (gameStatus === 'started' &&
          currentPlayer?.userStatus === 'pending')) && (
        <LobbyPage info={gameData} setGameStatus={setGameStatus} />
      )}
      {gameStatus === 'started' && currentPlayer?.userStatus !== 'pending' && (
        <GamePage info={gameData} setGameStatus={setGameStatus} />
      )}
      {gameStatus === 'completed' && (
        <GameResults roundResults={gameData.votes} tasks={gameData.tasks} />
      )}

      {showKickProposal &&
        kickProposeBy &&
        playerToKick &&
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
