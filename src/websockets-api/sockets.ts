import React from 'react';
import io from 'socket.io-client';
import { GameInfo } from '../models/GameInfoAggregate/GameInfoModel';

class SocketHandler {
  socket = io('http://localhost:3001');

  gameId: string;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.socket.on('connect', () => {
      this.socket.emit('create', this.gameId);
    });
  }

  handleUpdateMembers(
    gameData: GameInfo,
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('membersChange', members => {
      setGameData(prev => ({ ...prev, members }));
    });
  }

  handleUpdateIssues(
    gameData: GameInfo,
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('issuesChange', tasks => {
      setGameData(prev => ({ ...prev, tasks }));
    });
  }
}
export default SocketHandler;
