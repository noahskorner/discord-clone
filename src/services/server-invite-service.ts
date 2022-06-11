import { AxiosResponse } from 'axios';
import ServerInviteDto from '../utils/types/dtos/server-invite';
import CreateServerInviteRequest from '../utils/types/requests/server/invite/create-server-invite';
import API from './api';

const ServerInviteService = {
  create: (
    serverId: number,
    payload: CreateServerInviteRequest,
  ): Promise<AxiosResponse<ServerInviteDto>> => {
    return API.post(`/server/${serverId}/invite`, payload);
  },
};

export default ServerInviteService;
