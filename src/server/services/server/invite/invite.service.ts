import ErrorEnum from '../../../../utils/enums/errors';
import EventEnum from '../../../../utils/enums/events';
import MessageType from '../../../../utils/enums/message-type';
import DirectMessageDto from '../../../../utils/types/dtos/direct-message';
import ServerInviteDto from '../../../../utils/types/dtos/server-invite';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import SystemError from '../../../../utils/types/interfaces/system-error';
import CreateMessageRequest from '../../../../utils/types/requests/message/create-message';
import Friend from '../../../db/models/friend.model';
import ServerInvite from '../../../db/models/server-invite.model';
import Server from '../../../db/models/server.model';
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
      message: 'You have already invited this friend to this server.',
    },
  ],
);
const ERROR_FRIEND_NOT_FOUND = new SystemError(
  ErrorEnum.FRIEND_REQUEST_NOT_FOUND,
  [
    {
      message: 'You must be friends with this user to invite them to a server.',
    },
  ],
);

class ServerInviteService {
  private _serverService: ServerService;
  private _directMessageService: DirectMessageService;
  private _messageService: MessageService;
  // private _io: WebSocket;

  constructor() {
    this._serverService = new ServerService();
    this._directMessageService = new DirectMessageService();
    this._messageService = new MessageService();
    // (global as any).io = (global as any).io;
  }

  public async create({
    userId,
    serverId,
    friendId,
  }: {
    userId: number;
    serverId: number;
    friendId: number;
  }): Promise<{ serverInvite?: ServerInviteDto; errors?: ErrorInterface[] }> {
    const validationErrors = InviteValidator.create({ friendId });
    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    const { requester, addressee } = await this.findRequesterAndAddressee({
      userId,
      serverId,
      friendId,
    });

    const serverInvite = await ServerInvite.create({
      serverId: serverId,
      requesterId: userId,
      addresseeId: addressee.id,
    });
    serverInvite.requester = requester!;
    serverInvite.addressee = addressee;

    const server = await Server.findByPk(serverId);

    this.sendServerInviteDirectMessage({
      userId,
      requesterUsername: requester!.username,
      addresseeId: addressee.id,
      friendId,
      serverName: server!.name,
      serverInviteId: serverInvite.id,
    });

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
    friendId,
  }: {
    userId: number;
    serverId: number;
    friendId: number;
  }) {
    await this.throwIfUserNotInServer(serverId, userId);

    const requester = await User.findByPk(userId);
    const addressee = await this.findAddresseeFromFriendId(userId, friendId);

    await this.throwIfInviteAlreadyExists(
      requester!.id,
      addressee.id,
      serverId,
    );

    return { requester, addressee };
  }

  private async findAddresseeFromFriendId(userId: number, friendId: number) {
    const friend = await Friend.findOne({
      where: {
        [Op.and]: [
          { id: friendId },
          { [Op.or]: [{ requesterId: userId }, { addresseeId: userId }] },
        ],
      },
      include: [
        { model: User, as: 'addressee' },
        { model: User, as: 'requester' },
      ],
    });

    if (friend == null) throw ERROR_FRIEND_NOT_FOUND;
    return friend.requesterId === userId ? friend.addressee : friend.requester;
  }

  private async throwIfUserNotInServer(serverId: number, userId: number) {
    const userIsInServer = await this._serverService.getIsUserInServer(
      serverId,
      userId,
    );
    if (!userIsInServer) throw ERROR_USER_NOT_IN_SERVER;
  }

  private async throwIfInviteAlreadyExists(
    requesterId: number,
    addresseeId: number,
    serverId: number,
  ) {
    const inviteAlreadyExists = await ServerInvite.findOne({
      where: {
        requesterId,
        addresseeId,
        serverId,
      },
    });
    if (inviteAlreadyExists != null) throw ERROR_INVITE_ALREADY_EXISTS;
  }

  private async sendServerInviteDirectMessage({
    userId,
    requesterUsername,
    addresseeId,
    serverName,
    friendId,
    serverInviteId,
  }: {
    userId: number;
    requesterUsername: string;
    serverName: string;
    addresseeId: number;
    friendId: number;
    serverInviteId: number;
  }) {
    const { directMessage, created } =
      await this._directMessageService.getOrCreateDirectMessage({
        userId,
        addresseeId,
        friendId,
      });

    if (created) {
      this.emitDirectMessageToUser(userId, directMessage);
      this.emitDirectMessageToUser(addresseeId, directMessage);
    }

    const createMessageRequest: CreateMessageRequest = {
      type: MessageType.SERVER_INVITE,
      body: `${requesterUsername} has invited you to join ${serverName}!`,
      directMessageId: directMessage!.id,
      serverInviteId: serverInviteId,
    };

    const { message } = await this._messageService.create(
      userId,
      createMessageRequest,
    );

    (global as any).io
      .in(directMessage.id.toString())
      .emit(EventEnum.RECEIVE_DIRECT_MESSAGE, message);
  }

  private async emitDirectMessageToUser(
    userId: number,
    directMessage: DirectMessageDto,
  ) {
    const socket = await (global as any).io.findByUserId(userId);
    if (socket != null) {
      (global as any).io
        .to(socket.id)
        .emit(EventEnum.DIRECT_MESSAGE_CREATED, directMessage);
    }
  }
}

export default ServerInviteService;
