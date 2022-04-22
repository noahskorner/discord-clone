import ErrorEnum from '../../../utils/enums/errors';
import ServerRoleEnum from '../../../utils/enums/server-roles';
import ServerDTO from '../../../utils/types/dtos/server';
import ErrorInterface from '../../../utils/types/interfaces/error';
import SystemError from '../../../utils/types/interfaces/system-error';
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
  ): Promise<{ errors?: ErrorInterface[]; server?: ServerDTO }> => {
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

    return { server: new ServerDTO(server) };
  };

  public findAllByUserId = async (userId: number): Promise<ServerDTO[]> => {
    const servers = await Server.findAll({
      include: {
        model: ServerUser,
        where: {
          userId,
        },
      },
    });

    return servers.map((server) => new ServerDTO(server));
  };

  public findById = async (
    serverId: number,
    userId: number,
  ): Promise<ServerDTO> => {
    if (isNaN(serverId)) throw ERROR_SERVER_NOT_FOUND;

    const userCanRead = await this.userCanRead(serverId, userId);
    if (!userCanRead) throw ERROR_INSUFFICIENT_PERMISSIONS;

    const server = await Server.findByPk(serverId, {
      include: [
        {
          model: ServerUser,
        },
      ],
    });

    if (server == null)
      throw new SystemError(ErrorEnum.SERVER_NOT_FOUND, [
        {
          message: 'Server does not exist.',
        },
      ]);
    else return new ServerDTO(server);
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
}

export default ServerService;
