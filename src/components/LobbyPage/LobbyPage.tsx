import * as React from 'react';
import './lobbyPage.css';
import LobbyPageScramMaster from './LobbyPageScramMaster';
// import LobbyPagePlayers from './LobbyPagePlayers';

function LobbyPage(): JSX.Element {
  return (
    <div className="lobby-page">
      <LobbyPageScramMaster />
    </div>
  );
}
export default LobbyPage;
