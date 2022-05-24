import { AxiosResponse } from 'axios';
import ChannelDto from '../utils/types/dtos/channel';
import CreateDirectMessageRequest from '../utils/types/requests/user/direct-message/create-direct-message';
import API from './api';

const DirectMessageService = {
  create: (
    payload: CreateDirectMessageRequest,
  ): Promise<AxiosResponse<ChannelDto>> => {
    return API.post(`/user/${payload.userId}/direct-message`, payload);
  },
};

export default DirectMessageService;
