import { AxiosResponse } from 'axios';
import FriendRequestDto from '../utils/types/dtos/friend-request';
import CreateFriendRequest from '../utils/types/requests/user/friend/create-friend';
import API from './api';

const FriendService = {
  create: (
    userId: number,
    payload: CreateFriendRequest,
  ): Promise<AxiosResponse<FriendRequestDto>> => {
    return API.post(`/user/${userId}/friend`, payload);
  },
  update: (
    userId: number,
    friendId: number,
  ): Promise<AxiosResponse<FriendRequestDto>> => {
    return API.put(`/user/${userId}/friend/${friendId}`);
  },
};

export default FriendService;
