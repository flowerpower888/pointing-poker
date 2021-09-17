import React from 'react';
import io from 'socket.io-client';
import { GameInfo, Member } from '../models/GameInfoAggregate/GameInfoModel';

class SocketHandler {
  socket = io('http://localhost:3001');

  gameId: string;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.socket.on('connect', () => {
      this.socket.emit('create', this.gameId);
      console.log('connected');
    });
  }

  // TODO fix members type
  handleAddMember(
    gameData: GameInfo,
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('memberConnected', data => {
      console.log(data);
      const newGameData = gameData;
      const members: Member[] = data[0];
      newGameData.members = members;
      setGameData(newGameData);
    });
  }
}
export default SocketHandler;
