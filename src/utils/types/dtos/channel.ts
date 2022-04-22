import Channel from '../../../server/db/models/channel.model';
import ChannelType from '../../enums/channel-type';

class ChannelDTO {
  public type: ChannelType;
  public name: string;

  constructor(channel: Channel) {
    this.type = channel.type as ChannelType;
    this.name = channel.name;
  }
}

export default ChannelDTO;
