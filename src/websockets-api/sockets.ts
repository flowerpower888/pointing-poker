import React from 'react';
import io from 'socket.io-client';
import {
  GameInfo,
  GameStatus,
} from '../models/GameInfoAggregate/GameInfoModel';

class SocketHandler {
  private static instance: SocketHandler;

  socket = io('http://localhost:3001');

  gameId: string;

  constructor() {
    this.gameId = '';
    this.socket.on('connect', () => {
      console.log('connected constructor', this.socket.id);
    });
  }

  static getInstance(): SocketHandler {
    if (!SocketHandler.instance) {
      SocketHandler.instance = new SocketHandler();
    }
    return SocketHandler.instance;
  }

  joinGameRoom(gameId: string): void {
    if (this.gameId !== '' && gameId !== this.gameId) {
      this.socket.emit('leaveGameRoom', this.gameId);
    }
    this.gameId = gameId;
    this.socket.emit('joinGameRoom', this.gameId);
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
    console.log('tasksChange handle', Date.now());
    this.socket.on('tasksChange', tasks => {
      setGameData(tasks);
      console.log('tasksChange handle msg', tasks, Date.now());
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

  handlerUpdateTimer(
    setTimerStatus: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    this.socket.on('timerStatus', status => {
      console.log(status);
      setTimerStatus(status);
    });
  }
}
export default SocketHandler;
