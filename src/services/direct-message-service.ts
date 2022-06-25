import { AxiosResponse } from 'axios';
import DirectMessageDto from '../utils/types/dtos/direct-message';
import CreateDirectMessageRequest from '../utils/types/requests/user/direct-message/create-direct-message';
import API from './api';

const DirectMessageService = {
  create: (
    payload: CreateDirectMessageRequest,
  ): Promise<AxiosResponse<DirectMessageDto>> => {
    return API.post(`/user/${payload.userId}/direct-message`, payload);
  },
  get: ({
    userId,
    directMessageId,
  }: {
    userId: number;
    directMessageId: string | number;
  }): Promise<AxiosResponse<DirectMessageDto>> => {
    return API.get(`/user/${userId}/direct-message/${directMessageId}`);
  },
};

export default DirectMessageService;
