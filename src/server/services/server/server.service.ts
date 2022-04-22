import ChannelType from '../../../utils/enums/channel-type';
import ErrorEnum from '../../../utils/enums/errors';
import ServerRoleEnum from '../../../utils/enums/server-roles';
import ServerDto from '../../../utils/types/dtos/server';
import ErrorInterface from '../../../utils/types/interfaces/error';
import SystemError from '../../../utils/types/interfaces/system-error';
import Channel from '../../db/models/channel.model';
import ServerUser from '../../db/models/server-user.model';
import Server from '../../db/models/server.model';
import User from '../../db/models/user.model';

const ERROR_USER_NOT_FOUND: ErrorInterface = {
  message: 'User creating this server was not found.',
};
const ERROR_SERVER_NOT_FOUND = new SystemError(ErrorEnum.SERVER_NOT_FOUND, [
  {
    message: 'Server does not exist.',
  },
]);
const ERROR_INSUFFICIENT_PERMISSIONS = new SystemError(
  ErrorEnum.INSUFFICIENT_PERMISIONS,
  [
    {
      message: 'You do not have access to this server.',
    },
  ],
);

class ServerService {
  public create = async (
    name: string,
    createdById: number,
  ): Promise<{ errors?: ErrorInterface[]; server?: ServerDto }> => {
    const user = await User.findByPk(createdById);
    if (user == null) return { errors: [ERROR_USER_NOT_FOUND] };

    const server = await Server.create(
      {
        name,
        createdById,
        users: [
          {
            userId: user.id,
            role: ServerRoleEnum.OWNER,
          },
        ],
      },
      { include: [ServerUser] },
    );
    server.users[0].user = user;
    server.channels = await this.createDefaultChannels(server.id);

    return { server: new ServerDto(server) };
  };

  public findAllByUserId = async (userId: number): Promise<ServerDto[]> => {
    const servers = await Server.findAll({
      include: [
        {
          model: ServerUser,
          where: {
            userId,
          },
        },
        {
          model: Channel,
        },
      ],
    });

    return servers.map((server) => new ServerDto(server));
  };

  public findById = async (
    serverId: number,
    userId: number,
  ): Promise<ServerDto> => {
    if (isNaN(serverId)) throw ERROR_SERVER_NOT_FOUND;

    const userCanRead = await this.userCanRead(serverId, userId);
    if (!userCanRead) throw ERROR_INSUFFICIENT_PERMISSIONS;

    const server = await Server.findByPk(serverId, {
      include: [
        {
          model: ServerUser,
        },
        {
          model: Channel,
        },
      ],
    });

    if (server == null)
      throw new SystemError(ErrorEnum.SERVER_NOT_FOUND, [
        {
          message: 'Server does not exist.',
        },
      ]);
    else return new ServerDto(server);
  };

  private userCanRead = async (
    serverId: number,
    userId: number,
  ): Promise<boolean> => {
    const userIsInServer = await ServerUser.findOne({
      where: {
        serverId,
        userId,
      },
    });

    return userIsInServer != null;
  };

  private createDefaultChannels = async (
    serverId: number,
  ): Promise<Channel[]> => {
    const textChannel = await Channel.create({
      serverId: serverId,
      type: ChannelType.TEXT,
      name: 'general',
    });
    const voiceChannel = await Channel.create({
      serverId: serverId,
      type: ChannelType.VOICE,
      name: 'general',
    });

    return [textChannel, voiceChannel];
  };
}

export default ServerService;
