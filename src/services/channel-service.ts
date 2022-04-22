import { AxiosResponse } from 'axios';
import ChannelDto from '../utils/types/dtos/channel';
import CreateChannelRequest from '../utils/types/requests/server/channel/create-channel';
import API from './api';

const ChannelService = {
  create: (
    serverId: number,
    payload: CreateChannelRequest,
  ): Promise<AxiosResponse<ChannelDto>> => {
    return API.post(`/server/${serverId}/channel`, payload);
  },
};

export default ChannelService;
