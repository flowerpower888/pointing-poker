import { AxiosResponse } from 'axios';
import instance from './api';

const kickByVoteAPI = {
  sendVotes(
    gameId: string,
    playerToKickId: string,
    kickProposeById: string,
    action: string,
    vote: boolean,
  ): Promise<AxiosResponse> {
    return instance.post(`/api/kick/${gameId}`, {
      playerToKickId,
      kickProposeById,
      action,
      vote,
    });
  },
};
export default kickByVoteAPI;
