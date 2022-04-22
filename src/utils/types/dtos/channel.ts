import Channel from '../../../server/db/models/channel.model';
import ChannelType from '../../enums/channel-type';

class ChannelDto {
  public id: number;
  public type: ChannelType;
  public name: string;

  constructor(channel: Channel) {
    this.id = channel.id;
    this.type = channel.type as ChannelType;
    this.name = channel.name;
  }
}

export default ChannelDto;
