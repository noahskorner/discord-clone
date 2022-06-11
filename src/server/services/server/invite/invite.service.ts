import ErrorEnum from '../../../../utils/enums/errors';
import ServerInviteDto from '../../../../utils/types/dtos/server-invite';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import SystemError from '../../../../utils/types/interfaces/system-error';
import ServerInvite from '../../../db/models/server-invite.model';
import User from '../../../db/models/user.model';
import InviteValidator from '../../../validators/server/invite/invite.validator';
import MessageService from '../../message';
import DirectMessageService from '../../user/direct-message/direct-message.service';
import ServerService from '../server.service';
const { Op } = require('sequelize');

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
const ERROR_USER_NOT_FOUND = new SystemError(ErrorEnum.USER_NOT_FOUND, [
  {
    message: 'The user you are trying to invite does not exist.',
  },
]);

class ServerInviteService {
  private _serverService: ServerService;
  private _directMessageService: DirectMessageService;
  private _messageService: MessageService;

  constructor() {
    this._serverService = new ServerService();
    this._directMessageService = new DirectMessageService();
    this._messageService = new MessageService();
  }

  public async create({
    userId,
    serverId,
    addresseeId,
  }: {
    userId: number;
    serverId: number;
    addresseeId: number;
  }): Promise<{ serverInvite?: ServerInviteDto; errors?: ErrorInterface[] }> {
    const validationErrors = InviteValidator.create({ addresseeId });
    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    const { requester, addressee } = await this.findRequesterAndAddressee({
      userId,
      serverId,
      addresseeId,
    });

    const serverInvite = await ServerInvite.create({
      serverId: serverId,
      requesterId: userId,
      addresseeId: addresseeId,
    });
    serverInvite.requester = requester!;
    serverInvite.addressee = addressee;

    this.sendServerInviteDirectMessage({ userId, addresseeId });

    return { serverInvite: new ServerInviteDto(serverInvite) };
  }

  public async findAllByUserId(userId: number) {
    const serverInvites = await ServerInvite.findAll({
      where: { [Op.or]: [{ requesterId: userId }, { addresseeId: userId }] },
      include: [
        { model: User, as: 'addressee' },
        { model: User, as: 'requester' },
      ],
    });

    return serverInvites.map(
      (serverInvite) => new ServerInviteDto(serverInvite),
    );
  }

  private async findRequesterAndAddressee({
    userId,
    serverId,
    addresseeId,
  }: {
    userId: number;
    serverId: number;
    addresseeId: number;
  }) {
    const userIsInServer = await this._serverService.getIsUserInServer(
      serverId,
      userId,
    );
    if (!userIsInServer) throw ERROR_USER_NOT_IN_SERVER;

    const requester = await User.findByPk(userId);

    const addressee = await User.findByPk(addresseeId);
    if (addressee == null) throw ERROR_USER_NOT_FOUND;

    const inviteAlreadyExists = await ServerInvite.findOne({
      where: {
        addresseeId: addresseeId,
      },
    });
    if (inviteAlreadyExists != null) throw ERROR_INVITE_ALREADY_EXISTS;

    return { requester, addressee };
  }

  private async sendServerInviteDirectMessage({
    userId,
    addresseeId,
  }: {
    userId: number;
    addresseeId: number;
  }) {
    return;
    // const directMessage =
    //   await this._directMessageService.getOrCreateDirectMessage({
    //     userId,
    //     addresseeId,
    //   });

    // const createMessageRequest: CreateMessageRequest = {
    //   type: MessageType.DIRECT,
    //   body: '',
    // };

    // await this._messageService.create();
  }
}

export default ServerInviteService;
