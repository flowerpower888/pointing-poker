import { AxiosResponse } from 'axios';
import { SettingsType } from '../models/GameInfoAggregate/GameInfoModel';
import instance from './api';

const settingsAPI = {
  set(settings: SettingsType, gameId: string) {
    return instance.post(`/api/settings/${gameId}`, {
      settings,
    });
  },
};

export default settingsAPI;
