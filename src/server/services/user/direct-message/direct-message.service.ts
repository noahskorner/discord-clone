const { Op } = require('sequelize');
import ErrorEnum from '../../../../utils/enums/errors';
import DirectMessageDto from '../../../../utils/types/dtos/direct-message';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import SystemError from '../../../../utils/types/interfaces/system-error';
import CreateDirectMessageRequest from '../../../../utils/types/requests/user/direct-message/create-direct-message';
import DirectMessageUser from '../../../db/models/direct-message-user.model';
import DirectMessage from '../../../db/models/direct-message.model';
import Friend from '../../../db/models/friend.model';
import User from '../../../db/models/user.model';
import DirectMessageValidator from '../../../validators/user/direct-message/direct-message.validator';

const ERROR_NOT_FRIENDS_WITH_ENTIRE_GROUP = new SystemError(
  ErrorEnum.CREATE_DIRECT_MESSAGE_NOT_FRIENDS_WITH_ENTIRE_GROUP,
  [
    {
      field: 'friendIds',
      message:
        'You must be friends with everyone that you invite to a direct message.',
    },
  ],
);

class DirectMessageService {
  public async createDirectMessage({
    userId,
    friendIds,
  }: CreateDirectMessageRequest): Promise<{
    directMessage?: DirectMessageDto;
    errors?: ErrorInterface[];
  }> {
    const validationErrors = DirectMessageValidator.create({
      userId,
      friendIds,
    });
    if (validationErrors.length > 0) return { errors: validationErrors };

    const friends = await Friend.findAll({
      where: {
        [Op.and]: [
          { id: friendIds },
          { [Op.or]: [{ requesterId: userId }, { addresseeId: userId }] },
        ],
      },
    });

    if (friends.length !== friendIds.length)
      throw ERROR_NOT_FRIENDS_WITH_ENTIRE_GROUP;

    const directMessage = await DirectMessage.create(
      {
        createdById: userId,
        users: friends.map((f) => {
          return {
            userId: userId === f.requesterId ? f.addresseeId : f.requesterId,
          };
        }),
      },
      {
        include: [{ model: DirectMessageUser }],
      },
    );
    directMessage.users = await this.findUsersByDirectMessageId(
      directMessage.id,
    );

    return { directMessage: new DirectMessageDto(directMessage) };
  }

  private async findUsersByDirectMessageId(directMessageId: number) {
    return await DirectMessageUser.findAll({
      where: {
        directMessageId: directMessageId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }
}

export default DirectMessageService;
