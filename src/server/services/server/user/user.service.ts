import ErrorEnum from '../../../../utils/enums/errors';
import ServerRoleEnum from '../../../../utils/enums/server-roles';
import ServerUserDto from '../../../../utils/types/dtos/server-user';
import SystemError from '../../../../utils/types/interfaces/system-error';
import ServerUser from '../../../db/models/server-user.model';
import User from '../../../db/models/user.model';
import ServerService from '../server.service';

const ERROR_USER_NOT_IN_SERVER = new SystemError(
  ErrorEnum.ADD_SERVER_USER_INSUFFICIENT_PERMISSIONS,
  [
    {
      message: 'Must belong to server to invite users to it.',
    },
  ],
);
const ERROR_USER_NOT_FOUND = new SystemError(ErrorEnum.USER_NOT_FOUND, [
  {
    message: 'The user you are trying to add does not exist.',
  },
]);

class ServerUserService {
  private _serverService;

  constructor() {
    this._serverService = new ServerService();
  }

  public async addUserToServer({
    userId,
    serverId,
    addUserId,
  }: {
    userId: number;
    serverId: number;
    addUserId: number;
  }): Promise<ServerUserDto> {
    const isUserInServer = await this._serverService.getIsUserInServer(
      serverId,
      userId,
    );
    if (!isUserInServer) throw ERROR_USER_NOT_IN_SERVER;

    const addUser = await User.findByPk(addUserId);
    if (addUser == null) throw ERROR_USER_NOT_FOUND;

    const serverUser = await ServerUser.create({
      serverId,
      userId,
      role: ServerRoleEnum.MEMBER,
    });
    serverUser.user = addUser;

    return new ServerUserDto(serverUser);
  }
}

export default ServerUserService;
