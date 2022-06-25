import MessageType from '../../../utils/enums/message-type';
import MessageDto from '../../../utils/types/dtos/message';
import ErrorInterface from '../../../utils/types/interfaces/error';
import CreateMessageRequest from '../../../utils/types/requests/message/create-message';
import Message from '../../db/models/message.model';
import ServerInvite from '../../db/models/server-invite.model';
import Server from '../../db/models/server.model';
import User from '../../db/models/user.model';
import MessageValidator from '../../validators/message';
import DirectMessageService, {
  ERROR_DIRECT_MESSAGE_USER_NOT_FOUND,
} from '../user/direct-message/direct-message.service';
const { Op } = require('sequelize');

class MessageService {
  private _directMessageService: DirectMessageService;

  constructor() {
    this._directMessageService = new DirectMessageService();
  }

  public async create(
    userId: number,
    request: CreateMessageRequest,
  ): Promise<{ message?: MessageDto; errors?: ErrorInterface[] }> {
    const validationErrors = MessageValidator.create(request);
    if (validationErrors.length > 0) return { errors: validationErrors };

    if (request.type === MessageType.DIRECT) {
      const message = await this.createDirectMesssage(userId, request);
      return { message: new MessageDto(message) };
    } else if (request.type === MessageType.SERVER_INVITE) {
      const message = await this.createServerInviteMessage(userId, request);
      return { message: new MessageDto(message) };
    } else {
      throw new Error('Method not implemented.');
    }
  }

  public async findAllByDirectMessageId(
    userId: number,
    directMessageId: number,
    skip: number,
    take: number,
  ): Promise<MessageDto[]> {
    const isUserInDirectMessage = await this.getIsUserInDirectMessage(
      directMessageId,
      userId,
    );
    if (!isUserInDirectMessage) throw ERROR_DIRECT_MESSAGE_USER_NOT_FOUND;

    const messages = await Message.findAll({
      where: {
        [Op.and]: [
          { directMessageId: directMessageId },
          {
            [Op.or]: [
              { type: MessageType.DIRECT },
              { type: MessageType.SERVER_INVITE },
            ],
          },
        ],
        directMessageId: directMessageId,
      },
      include: [
        {
          model: User,
        },
        {
          model: ServerInvite,
          include: [{ model: Server }],
        },
      ],
      order: [['created_at', 'DESC']],
      offset: skip,
      limit: take,
    });

    return messages.map((message) => new MessageDto(message));
  }

  private async createDirectMesssage(
    userId: number,
    request: CreateMessageRequest,
  ) {
    const isUserInDirectMessage = await this.getIsUserInDirectMessage(
      request.directMessageId!,
      userId,
    );
    if (!isUserInDirectMessage) throw ERROR_DIRECT_MESSAGE_USER_NOT_FOUND;

    const message = await Message.create({
      type: request.type,
      senderId: userId,
      body: request.body,
      directMessageId: request.directMessageId,
    });
    const sender = await User.findByPk(userId)!;
    message.sender = sender!;

    return message;
  }

  private async createServerInviteMessage(
    userId: number,
    request: CreateMessageRequest,
  ) {
    const isUserInDirectMessage = await this.getIsUserInDirectMessage(
      request.directMessageId!,
      userId,
    );
    if (!isUserInDirectMessage) throw ERROR_DIRECT_MESSAGE_USER_NOT_FOUND;

    const message = await Message.create({
      type: request.type,
      senderId: userId,
      body: request.body,
      directMessageId: request.directMessageId,
      serverInviteId: request.serverInviteId,
    });
    const sender = await User.findByPk(userId)!;
    message.sender = sender!;

    return message;
  }

  private async getIsUserInDirectMessage(
    directMessageId: number,
    userId: number,
  ): Promise<boolean> {
    const userInDirectMesssage = await this._directMessageService.findById(
      directMessageId,
      userId,
    );
    return userInDirectMesssage != null;
  }
}

export default MessageService;
