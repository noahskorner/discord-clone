import ErrorEnum from '../../../../utils/enums/errors';
import ServerInviteDto from '../../../../utils/types/dtos/server-invite';
import SystemError from '../../../../utils/types/interfaces/system-error';
import ServerInvite from '../../../db/models/server-invite.model';
import ServerUser from '../../../db/models/server-user.model';

const ERROR_USER_NOT_IN_SERVER = new SystemError(
  ErrorEnum.INVITE_SERVER_USER_INSUFFICIENT_PERMISSIONS,
  [
    {
      message: 'Must belong to server to invite users to it.',
    },
  ],
);
const ERROR_INVITE_ALREADY_EXISTS = new SystemError(
  ErrorEnum.INVITE_SERVER_USER_ALREADY_EXISTS,
  [
    {
      field: 'addresseeId',
      message: 'User has already been ',
    },
  ],
);

class ServerUserService {
  public async inviteUserToServer({
    userId,
    serverId,
    addresseeId,
  }: {
    userId: number;
    serverId: number;
    addresseeId: number;
  }): Promise<ServerInviteDto> {
    const requesterBelongsToServer = await ServerUser.findOne({
      where: {
        serverId: serverId,
        userId: userId,
      },
    });
    if (requesterBelongsToServer == null) throw ERROR_USER_NOT_IN_SERVER;

    const inviteAlreadyExists = await ServerInvite.findOne({
      where: {
        addresseeId: addresseeId,
      },
    });
    if (inviteAlreadyExists != null) throw ERROR_INVITE_ALREADY_EXISTS;

    const invite = await ServerInvite.create({
      serverId: serverId,
      requesterId: userId,
      addresseeId: addresseeId,
    });

    return new ServerInviteDto(invite);
  }
}

export default ServerUserService;
