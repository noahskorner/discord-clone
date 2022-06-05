import MessageType from '../../../utils/enums/message-type';
import MessageDto from '../../../utils/types/dtos/message';
import ErrorInterface from '../../../utils/types/interfaces/error';
import CreateMessageRequest from '../../../utils/types/requests/message/create-message';
import Message from '../../db/models/message.model';
import User from '../../db/models/user.model';
import MessageValidator from '../../validators/message';
import DirectMessageService, {
  ERROR_DIRECT_MESSAGE_USER_NOT_FOUND,
} from '../user/direct-message/direct-message.service';

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
      const userInDirectMesssage = await this._directMessageService
        .findById(request.directMessageId!, userId)
        .catch((e) => {
          console.log(e);
          return null;
        });
      if (userInDirectMesssage == null)
        throw ERROR_DIRECT_MESSAGE_USER_NOT_FOUND;

      const message = await Message.create({
        type: request.type,
        senderId: userId,
        body: request.body,
      });
      const sender = await User.findByPk(userId)!;
      message.sender = sender!;

      return { message: new MessageDto(message) };
    }
    throw new Error('Method not implemented.');
  }
}

export default MessageService;
