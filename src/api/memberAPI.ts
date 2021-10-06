import { AxiosResponse } from 'axios';
import {
  Member,
  MemberProperties,
} from '../models/GameInfoAggregate/GameInfoModel';
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

  delete(userId: string, gameId: string): Promise<AxiosResponse> {
    return instance.delete(`/api/members/${gameId}/${userId}`);
  },

  update(
    gameId: string,
    userId: string,
    memberProperties: MemberProperties,
  ): Promise<AxiosResponse> {
    return instance.patch(`/api/members/${gameId}/${userId}`, {
      ...memberProperties,
    });
  },
};

export default memberAPI;
