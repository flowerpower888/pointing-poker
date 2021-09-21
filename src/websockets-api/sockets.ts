import React from 'react';
import io from 'socket.io-client';
import {
  GameInfo,
  GameStatus,
} from '../models/GameInfoAggregate/GameInfoModel';

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
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('membersChange', members => {
      setGameData(prev => ({ ...prev, members }));
    });
  }

  handleUpdateIssues(
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('tasksChange', tasks => {
      setGameData(prev => ({ ...prev, tasks }));
    });
  }

  handleUpdateCurrentIssue(
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('currentTaskChange', currentTaskId => {
      setGameData(prev => ({ ...prev, currentTaskId }));
    });
  }

  handleUpdateStatus(
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  ): void {
    this.socket.on('gameStatusChange', status => {
      setGameData(prev => ({ ...prev, status }));
      setGameStatus(status);
    });
  }
}
export default SocketHandler;
