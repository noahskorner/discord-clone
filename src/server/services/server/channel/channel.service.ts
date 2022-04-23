import ChannelType from '../../../../utils/enums/channel-type';
import ErrorEnum from '../../../../utils/enums/errors';
import ChannelDto from '../../../../utils/types/dtos/channel';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import SystemError from '../../../../utils/types/interfaces/system-error';
import db from '../../../db/models';
import Channel from '../../../db/models/channel.model';
import ServerUser from '../../../db/models/server-user.model';
import ChannelValidator from '../../../validators/server/channel';
import ServerService from '../server.service';

const ERROR_CHANNEL_NOT_FOUND = new SystemError(ErrorEnum.CHANNEL_NOT_FOUND, [
  {
    message: 'Channel does not exist.',
  },
]);

const ERROR_INSUFFICIENT_PERMISSIONS = new SystemError(
  ErrorEnum.INSUFFICIENT_PERMISIONS,
  [
    {
      message: 'You do not have access to this channel.',
    },
  ],
);

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
  }): Promise<{ errors?: ErrorInterface[]; channel?: ChannelDto }> => {
    const errors = ChannelValidator.create({ ...request });
    if (errors.length > 0) return { errors };

    const { type, name, serverId, userId } = request;
    const server = await this._serverService.findById(serverId, userId);

    const channel = await Channel.create({
      serverId: server.id,
      type: type,
      name: name,
    });

    return { channel: new ChannelDto(channel) };
  };

  public findById = async (request: {
    channelId: number;
    userId: number;
  }): Promise<ChannelDto> => {
    const { channelId, userId } = request;

    if (isNaN(channelId)) throw ERROR_CHANNEL_NOT_FOUND;

    const channel = await Channel.findByPk(channelId);
    if (channel == null) throw ERROR_CHANNEL_NOT_FOUND;

    const userCanRead = await this.userCanRead(channelId, userId);
    if (!userCanRead) throw ERROR_INSUFFICIENT_PERMISSIONS;

    return new ChannelDto(channel);
  };

  private userCanRead = async (
    channelId: number,
    userId: number,
  ): Promise<boolean> => {
    const serverUsers = await db.sequelize.query(
      'SELECT * FROM server_user WHERE user_id = :userId AND server_id IN (SELECT server_id FROM channel WHERE id = :channelId) LIMIT 1',
      {
        replacements: { userId, channelId },
        mapToModel: true,
        model: ServerUser,
      },
    );

    return serverUsers.length > 0;
  };
}

export default ChannelService;
