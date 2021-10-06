import { AxiosResponse } from 'axios';
import { Message } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const chatAPI = {
  sendMessage(gameId: string, message: Message): Promise<AxiosResponse> {
    return instance.post(`/api/chat/${gameId}`, {
      message,
    });
  },
};

export default chatAPI;
