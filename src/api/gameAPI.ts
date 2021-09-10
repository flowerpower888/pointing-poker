import { GameInfo, Member } from '../types/types';
import instance from './api';

const gameAPI = {
  create(owner: Member) {
    return instance.post(`/api/games`, {
      owner,
    });
  },
  start() {
    return instance.put(`/api/games/status`);
  },
  getAllGames() {
    return instance.get<GameInfo[]>(`/api/games`);
  },
  getGameInfo(id: string) {
    return instance.get<GameInfo>(`/api/games/${id}`);
  },
};

export default gameAPI;
