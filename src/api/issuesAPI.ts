import { AxiosResponse } from 'axios';
import { Issue } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const gameId = localStorage.getItem('gameId') || '';

const issuesAPI = {
  add(task: Issue): Promise<AxiosResponse<{ issueId: string }>> {
    return instance.post(`/api/issues/${gameId}`, {
      task,
    });
  },

  update(
    task: Issue,
    taskId: string,
  ): Promise<AxiosResponse<{ taskId: string }>> {
    return instance.put(`/api/issues/${gameId}/${taskId}`, {
      task,
    });
  },

  delete(issueId: string): Promise<AxiosResponse> {
    return instance.delete(`/api/issues/${gameId}/${issueId}`);
  },

  setCurrent(issueId: string): Promise<AxiosResponse> {
    return instance.put(`/api/issues/${gameId}/current/${issueId}`);
  },
};

export default issuesAPI;
