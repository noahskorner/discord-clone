import { AxiosResponse } from 'axios';
import ServerDto from '../utils/types/dtos/server';
import CreateServerRequest from '../utils/types/requests/server/create-server';
import API from './api';

const ServerService = {
  create: (payload: CreateServerRequest): Promise<AxiosResponse<ServerDto>> => {
    return API.post('/server', payload);
  },
  list: (): Promise<AxiosResponse<ServerDto[]>> => {
    return API.get('/server');
  },
  get: (id: string | number): Promise<AxiosResponse<ServerDto>> => {
    return API.get(`/server/${id}`);
  },
};

export default ServerService;
