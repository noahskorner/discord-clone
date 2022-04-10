import { AxiosResponse } from 'axios';
import LoginRequest from '../utils/types/requests/auth/login';
import API from './api';

const AuthService = {
  login: (payload: LoginRequest): Promise<AxiosResponse<string>> => {
    return API.post('auth', payload);
  },
  refreshToken: (): Promise<AxiosResponse<string>> => {
    return API.get('auth');
  },
  logout: (): Promise<AxiosResponse<void>> => {
    return API.delete('auth');
  },
};

export default AuthService;
