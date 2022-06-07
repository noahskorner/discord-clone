import { AxiosResponse } from 'axios';
import MessageDto from '../utils/types/dtos/message';
import API from './api';

const MessageService = {
  list: ({
    directMessageId,
    skip,
    take,
  }: {
    directMessageId: string | number;
    skip: number;
    take: number;
  }): Promise<AxiosResponse<MessageDto[]>> => {
    return API.get(
      `/message/?directMessageId=${directMessageId}&skip=${skip}&take=${take}`,
    );
  },
};

export default MessageService;
