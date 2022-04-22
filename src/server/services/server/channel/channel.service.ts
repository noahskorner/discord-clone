import ChannelType from '../../../../utils/enums/channel-type';
import ChannelDTO from '../../../../utils/types/dtos/channel';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import Channel from '../../../db/models/channel.model';
import ChannelValidator from '../../../validators/server/channel';
import ServerService from '../server.service';

class ChannelService {
  private _serverService;

  constructor() {
    this._serverService = new ServerService();
  }

  public create = async (request: {
    type: ChannelType;
    name: string;
    serverId: any;
    userId: number;
  }): Promise<{ errors?: ErrorInterface[]; channel?: ChannelDTO }> => {
    const errors = ChannelValidator.create({ ...request });
    if (errors.length > 0) return { errors };

    const { type, name, serverId, userId } = request;
    const server = await this._serverService.findById(serverId, userId);

    const channel = await Channel.create({
      serverId: server.id,
      type: type,
      name: name,
    });

    return { channel: new ChannelDTO(channel) };
  };
}

export default ChannelService;
