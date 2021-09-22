import { AxiosResponse } from 'axios';
import { Issue } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const issuesAPI = {
  add(
    task: Issue,
    gameId: string,
  ): Promise<AxiosResponse<{ issueId: string }>> {
    return instance.post(`/api/issues/${gameId}`, {
      task,
    });
  },

  update(
    task: Issue,
    taskId: string,
    gameId: string,
  ): Promise<AxiosResponse<{ taskId: string }>> {
    return instance.put(`/api/issues/${gameId}/${taskId}`, {
      task,
    });
  },

  delete(issueId: string, gameId: string): Promise<AxiosResponse> {
    return instance.delete(`/api/issues/${gameId}/${issueId}`);
  },

  setCurrent(issueId: string, gameId: string): Promise<AxiosResponse> {
    return instance.put(`/api/issues/${gameId}/current/${issueId}`);
  },
};

export default issuesAPI;
