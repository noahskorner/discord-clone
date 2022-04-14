import ServerRoleEnum from '../../utils/enums/server-roles';
import ServerDTO from '../../utils/types/dtos/server';
import ErrorInterface from '../../utils/types/interfaces/error';
import ServerUser from '../db/models/server-user.model';
import Server from '../db/models/server.model';
import User from '../db/models/user.model';

const ERROR_USER_NOT_FOUND: ErrorInterface = {
  message: 'User creating this server was not found.',
};
export const ERROR_INSUFFICIENT_PERMISSIONS =
  'User does not belong to this server.';
export const ERROR_SERVER_NOT_FOUND = 'Server does not exist.';

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
    if (isNaN(serverId)) throw new Error(ERROR_SERVER_NOT_FOUND);

    const server = await Server.findByPk(serverId, {
      include: [
        {
          model: ServerUser,
        },
      ],
    });

    if (server == null) throw new Error(ERROR_SERVER_NOT_FOUND);

    const userCanRead = await this.userCanRead(serverId, userId);
    if (!userCanRead) throw new Error(ERROR_INSUFFICIENT_PERMISSIONS);
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
