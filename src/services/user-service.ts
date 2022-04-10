import { AxiosResponse } from 'axios';
import UserDTO from '../utils/types/dtos/user';
import ConfirmResetPasswordRequest from '../utils/types/requests/user/confirm-reset-password';
import CreateUserRequest from '../utils/types/requests/user/create-user';
import ResetPasswordRequest from '../utils/types/requests/user/reset-password';
import API from './api';

const UserService = {
  create: (payload: CreateUserRequest): Promise<AxiosResponse<UserDTO>> => {
    return API.post('/user', payload);
  },
  get: (userId: number): Promise<AxiosResponse<UserDTO>> => {
    return API.get(`/user/${userId}`);
  },
  verifyEmail: (token: string): Promise<AxiosResponse<void>> => {
    return API.put(`/user/verify-email/${token}`);
  },
  resetPassword: (
    payload: ResetPasswordRequest,
  ): Promise<AxiosResponse<void>> => {
    return API.put('/user/reset-password', payload);
  },
  confirmResetPassword: (
    token: string,
    payload: ConfirmResetPasswordRequest,
  ): Promise<AxiosResponse<void>> => {
    return API.put(`/user/reset-password/confirm/${token}`, payload);
  },
};

export default UserService;
