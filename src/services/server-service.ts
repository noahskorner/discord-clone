import { AxiosResponse } from 'axios';
import ServerDTO from '../utils/types/dtos/server';
import CreateServerRequest from '../utils/types/requests/server/create-server';
import API from './api';

const ServerService = {
  create: (payload: CreateServerRequest): Promise<AxiosResponse<ServerDTO>> => {
    return API.post('/server', payload);
  },
};

export default ServerService;