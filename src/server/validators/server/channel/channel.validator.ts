import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateChannelRequest from '../../../../utils/types/requests/server/channel/create-channel';

const ChannelValidator = {
  create: ({ type, name }: CreateChannelRequest): ErrorInterface[] => {
    return [];
  },
};

export default ChannelValidator;
