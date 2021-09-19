import { AxiosResponse } from 'axios';
import { Issue } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const memberAPI = {
  add(
    issue: Issue,
    gameId: string,
  ): Promise<AxiosResponse<{ issueId: string }>> {
    return instance.post(`/api/issues/${gameId}`, {
      issue,
    });
  },

  update(
    issue: Issue,
    gameId: string,
    issueId: string,
  ): Promise<AxiosResponse<{ issueId: string }>> {
    return instance.put(`/api/issues/${gameId}/${issueId}`, {
      issue,
    });
  },

  delete(issueId: string, gameId: string): Promise<AxiosResponse> {
    return instance.delete(`/api/members/${gameId}/${issueId}`);
  },
};

export default memberAPI;
