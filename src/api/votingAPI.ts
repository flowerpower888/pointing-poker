import { AxiosResponse } from 'axios';
import { CardModel, RoundResult } from '../models/RoundResult/RoundModel';
import instance from './api';

const votingAPI = {
  getVotes(gameId: string): Promise<AxiosResponse> {
    return instance.get(`/api/votes/${gameId}`);
  },
  getVotesByTask(
    gameId: string,
    taskId: string,
  ): Promise<AxiosResponse<RoundResult>> {
    return instance.get(`/api/votes/${gameId}/tasks/${taskId}`);
  },
  sendVote(
    gameId: string,
    playerId: string,
    taskId: string,
    card: CardModel,
  ): Promise<AxiosResponse> {
    return instance.post(`/api/votes/${gameId}`, {
      playerId,
      taskId,
      card,
    });
  },
  removeVote(gameId: string, playerId: string): Promise<AxiosResponse> {
    return instance.delete(`/api/votes/${gameId}/${playerId}`);
  },
};

export default votingAPI;
