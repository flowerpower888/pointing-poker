import { AxiosResponse } from 'axios';
import { Member } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const memberAPI = {
  add(
    member: Member,
    gameId: string,
  ): Promise<AxiosResponse<{ userId: string }>> {
    return instance.post(`/api/members/${gameId}`, {
      member,
    });
  },
};

export default memberAPI;
