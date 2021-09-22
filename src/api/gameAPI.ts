import { AxiosResponse } from 'axios';
import {
  GameInfo,
  GameStatus,
  Member,
} from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const gameAPI = {
  create(
    owner: Member,
  ): Promise<AxiosResponse<{ userId: string; gameId: string }>> {
    return instance.post(`/api/games`, {
      owner,
    });
  },
  start(gameId: string): Promise<AxiosResponse> {
    const status: GameStatus = 'started';
    return instance.put(`/api/status/${gameId}`, {
      status,
    });
  },
  complete(gameId: string): Promise<AxiosResponse> {
    const status: GameStatus = 'completed';
    return instance.put(`/api/status/${gameId}`, {
      status,
    });
  },
  addPhoto(imageFile: Blob): Promise<AxiosResponse<string>> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return instance.post(`/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllGames(): Promise<AxiosResponse<GameInfo[]>> {
    return instance.get<GameInfo[]>(`/api/games`);
  },
  getGameInfo(id: string): Promise<AxiosResponse<GameInfo>> {
    return instance.get<GameInfo>(`/api/games/${id}`);
  },
  startRound(gameId: string): Promise<AxiosResponse> {
    return instance.post(`api/round/${gameId}/started`, 'started');
  },
  stopRound(gameId: string): Promise<AxiosResponse> {
    return instance.post(`api/round/${gameId}/stopped`, 'stopped');
  },
};

export default gameAPI;
