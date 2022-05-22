import { AxiosResponse } from 'axios';
import FriendDto from '../utils/types/dtos/friend';
import CreateFriendRequest from '../utils/types/requests/user/friend/create-friend';
import API from './api';

const FriendService = {
  create: (
    userId: number,
    payload: CreateFriendRequest,
  ): Promise<AxiosResponse<FriendDto>> => {
    return API.post(`/user/${userId}/friend`, payload);
  },
  update: (
    userId: number,
    friendId: number,
  ): Promise<AxiosResponse<FriendDto>> => {
    return API.put(`/user/${userId}/friend/${friendId}`);
  },
};

export default FriendService;
