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
export const ERROR_DIRECT_MESSAGE_USER_NOT_FOUND = new SystemError(
  ErrorEnum.DIRECT_MESSAGE_USER_NOT_FOUND,
  [
    {
      message: "You aren't in this direct message buddy.",
    },
  ],
);
const ERROR_DIRECT_MESSAGE_NOT_FOUND = new SystemError(
  ErrorEnum.DIRECT_MESSAGE_NOT_FOUND,
  [
    {
      message: 'That direct message does not exist.',
    },
  ],
);

class DirectMessageService {
  public async findById(id: number, userId: number) {
    const userInDirectMesssage = await DirectMessageUser.findOne({
      where: {
        directMessageId: id,
        userId,
      },
    });

    if (userInDirectMesssage == null) throw ERROR_DIRECT_MESSAGE_USER_NOT_FOUND;

    const directMessage = await DirectMessage.findByPk(id, {
      include: [
        {
          model: DirectMessageUser,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    if (directMessage == null) throw ERROR_DIRECT_MESSAGE_NOT_FOUND;

    return new DirectMessageDto(directMessage);
  }

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
    const directMessagesWithUsers = await this.findAllDirectMessageUsers(
      directMessages,
    );

    return directMessagesWithUsers.map((dm) => new DirectMessageDto(dm));
  }

  private async findAllDirectMessageUsers(
    directMessages: DirectMessage[],
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
