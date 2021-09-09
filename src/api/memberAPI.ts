import { Member } from '../types/types';
import instance from './api';

const memberAPI = {
  add(member: Member) {
    return instance.post(`/api/members`, {
      member,
    });
  },
};

export default memberAPI;
