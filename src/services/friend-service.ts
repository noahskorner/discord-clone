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
};

export default FriendService;
