import { AxiosResponse } from 'axios';
import ServerUserDto from '../utils/types/dtos/server-user';
import API from './api';

const ServerUserService = {
  create: (
    serverId: number,
    payload: {
      serverInviteId: number;
    },
  ): Promise<AxiosResponse<ServerUserDto>> => {
    return API.post(`/server/${serverId}/user`, payload);
  },
};

export default ServerUserService;
