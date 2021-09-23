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
  // TODO: delete vote on player kick
};

export default votingAPI;
