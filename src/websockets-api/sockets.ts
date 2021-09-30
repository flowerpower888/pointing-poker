import React from 'react';
import io from 'socket.io-client';
import {
  GameInfo,
  GameStatus,
} from '../models/GameInfoAggregate/GameInfoModel';
import { RoundResult } from '../models/RoundResult/RoundModel';

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

  handleUpdateSettings(
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('createSettings', settings => {
      setGameData(prev => ({ ...prev, settings }));
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

  handleUpdateTimerStatus(
    setTimerStatus: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    this.socket.on('roundStatusChange', status => {
      setTimerStatus(status);
    });
  }

  handleUpdateRoundResult(
    setRoundResult: React.Dispatch<React.SetStateAction<RoundResult | null>>,
  ): void {
    this.socket.on('roundResultChange', roundResult => {
      setRoundResult(roundResult);
    });
  }

  handleUpdateChat(
    setGameData: React.Dispatch<React.SetStateAction<GameInfo>>,
  ): void {
    this.socket.on('messagesChanging', chat => {
      setGameData(prev => ({ ...prev, chat }));
    });
  }
}

export default SocketHandler;
