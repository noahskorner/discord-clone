const { Op, QueryTypes } = require('sequelize');
import ErrorEnum from '../../../../utils/enums/errors';
import DirectMessageDto from '../../../../utils/types/dtos/direct-message';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import SystemError from '../../../../utils/types/interfaces/system-error';
import CreateDirectMessageRequest from '../../../../utils/types/requests/user/direct-message/create-direct-message';
import db from '../../../db/models';
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

    const directMessageUsers = await this.createDirectMessageUsers({
      userId,
      friendIds,
    });
    const directMessage = await DirectMessage.create(
      {
        createdById: userId,
        users: directMessageUsers,
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

  public async findDirectMessagesByUserId(
    userId: number,
  ): Promise<DirectMessageDto[]> {
    const directMessages = await db.sequelize.query(
      'SELECT * FROM direct_message WHERE id IN (SELECT direct_message_id FROM direct_message_user WHERE user_id = ?)',
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
        mapToModel: true,
        model: DirectMessage,
      },
    );
    const directMessagesWithUsers =
      await this.findAllDirectMessageUsersExceptSelf(directMessages, userId);

    return directMessagesWithUsers.map((dm) => new DirectMessageDto(dm));
  }

  private async findAllDirectMessageUsersExceptSelf(
    directMessages: DirectMessage[],
    userId: number,
  ): Promise<DirectMessage[]> {
    const directMessageIds = directMessages.map((dm) => dm.id);
    const directMessageUsers = await DirectMessageUser.findAll({
      where: {
        directMessageId: {
          [Op.in]: directMessageIds,
        },
      },
      include: [
        {
          model: User,
          where: {
            id: {
              [Op.not]: userId,
            },
          },
        },
      ],
    });
    const directMessagesWithUsers = directMessages.map((dm) => {
      dm.users = directMessageUsers.filter(
        (dmu) => dmu.directMessageId === dm.id,
      );
      return dm;
    });

    return directMessagesWithUsers;
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

  private async createDirectMessageUsers({
    userId,
    friendIds,
  }: CreateDirectMessageRequest) {
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

    const directMessageUsers = friends.map((f) => {
      return {
        userId: userId === f.requesterId ? f.addresseeId : f.requesterId,
      };
    });
    directMessageUsers.push({
      userId: userId,
    });

    return directMessageUsers;
  }
}

export default DirectMessageService;
