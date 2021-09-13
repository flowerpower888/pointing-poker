import * as React from 'react';
import './lobbyPage.css';
import LobbyPageScramMaster from './LobbyPageScramMaster';
import LobbyPagePlayers from './LobbyPagePlayers';

type PropsType = {
  position: 'member' | 'master' | string;
};

const LobbyPage: React.FC<PropsType> = ({ position }) => (
  <div className="lobby-page">
    {position === 'master' ? <LobbyPageScramMaster /> : <LobbyPagePlayers />}
  </div>
);

export default LobbyPage;
