import ChannelType from '../../../../enums/channel-type';

interface CreateChannelRequest {
  type: ChannelType;
  name: string;
}

export default CreateChannelRequest;
