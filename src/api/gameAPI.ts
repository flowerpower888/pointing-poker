import { AxiosResponse } from 'axios';
import { GameInfo, Member } from '../types/types';
import instance from './api';

const gameAPI = {
  create(owner: Member): Promise<AxiosResponse> {
    return instance.post(`/api/games`, {
      owner,
    });
  },
  start(): Promise<AxiosResponse> {
    return instance.put(`/api/games/status`);
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
};

export default gameAPI;
