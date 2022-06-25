import DateUtils from '../../../../utils/date-utils';
import ErrorEnum from '../../../../utils/enums/errors';
import ServerRoleEnum from '../../../../utils/enums/server-roles';
import ServerUserDto from '../../../../utils/types/dtos/server-user';
import SystemError from '../../../../utils/types/interfaces/system-error';
import ServerInvite from '../../../db/models/server-invite.model';
import ServerUser from '../../../db/models/server-user.model';
import User from '../../../db/models/user.model';

const ERROR_NOT_INVITED = new SystemError(ErrorEnum.NOT_INVITED, [
  {
    message: 'You are not invited to this server, pal.',
  },
]);

class ServerUserService {
  public async create({
    userId,
    serverInviteId,
  }: {
    userId: number;
    serverInviteId: number;
  }): Promise<ServerUserDto> {
    const serverInvite = await ServerInvite.findOne({
      where: {
        addresseeId: userId,
        id: serverInviteId,
      },
      include: [{ model: User, as: 'addressee' }],
    });

    if (serverInvite == null) throw ERROR_NOT_INVITED;

    serverInvite.update({
      accepted: true,
      acceptedAt: DateUtils.UTC(),
    });

    const serverUser = await ServerUser.create({
      serverId: serverInvite.serverId,
      userId: userId,
      role: ServerRoleEnum.MEMBER,
    });
    serverUser.user = serverInvite.addressee;

    return new ServerUserDto(serverUser);
  }
}

export default ServerUserService;
