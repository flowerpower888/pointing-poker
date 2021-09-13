import { AxiosResponse } from 'axios';
import { Member } from '../types/types';
import instance from './api';

const memberAPI = {
  add(member: Member): Promise<AxiosResponse> {
    return instance.post(`/api/members`, {
      member,
    });
  },
};

export default memberAPI;
