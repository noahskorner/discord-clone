const { Op } = require('sequelize');
import DateUtils from '../../../../utils/date-utils';
import ErrorEnum from '../../../../utils/enums/errors';
import FriendDto from '../../../../utils/types/dtos/friend';
import SystemError from '../../../../utils/types/interfaces/system-error';
import Friend from '../../../db/models/friend.model';
import User from '../../../db/models/user.model';
import UserService from '../user.service';

const ERROR_ADDRESSEE_NOT_FOUND = new SystemError(
  ErrorEnum.ADDRESSEE_NOT_FOUND,
  [
    {
      field: 'addresseeEmail',
      message: 'Addressee does with that email does not exist.',
    },
  ],
);
const ERROR_FRIEND_REQUEST_ALREADY_EXISTS = new SystemError(
  ErrorEnum.FRIEND_REQUEST_ALREADY_EXISTS,
  [
    {
      message: 'Friend request already exists.',
    },
  ],
);
const ERROR_FRIENDS_WITH_SELF = new SystemError(ErrorEnum.FRIENDS_WITH_SELF, [
  {
    message: 'Cannot be friends with yourself. Go outside and play.',
  },
]);
const ERROR_FRIEND_REQUEST_NOT_FOUND = new SystemError(
  ErrorEnum.FRIEND_REQUEST_NOT_FOUND,
  [
    {
      message: 'Friend request not found',
    },
  ],
);
const ERROR_FRIEND_REQUEST_INSUFFICIENT_PERMISSIONS = new SystemError(
  ErrorEnum.FRIEND_REQUEST_INSUFFICIENT_PERMISSIONS,
  [
    {
      message: 'Insufficient permissions to update this friend request.',
    },
  ],
);

class FriendService {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  public async createFriendRequest({
    requesterId,
    addresseeEmail,
  }: {
    requesterId: number;
    addresseeEmail: string;
  }): Promise<FriendDto> {
    const requester = await User.findByPk(requesterId);
    if (requester == null) throw new Error();
    const addressee = await this._userService.findUserByEmail(addresseeEmail);
    if (addressee == null) throw ERROR_ADDRESSEE_NOT_FOUND;
    if (addressee.id === requesterId) throw ERROR_FRIENDS_WITH_SELF;

    const friendExists = await Friend.findOne({
      where: {
        [Op.or]: [
          {
            requesterId,
            addresseeId: addressee.id,
          },
          {
            requesterId: addressee.id,
            addresseeId: requesterId,
          },
        ],
      },
    });
    if (friendExists != null) throw ERROR_FRIEND_REQUEST_ALREADY_EXISTS;

    const request = {
      requesterId,
      addresseeId: addressee.id,
      accepted: false,
      requestedAt: DateUtils.UTC(),
    };
    const friend = await Friend.create(request);
    friend.requester = requester;
    friend.addressee = addressee;

    return new FriendDto(friend);
  }

  public async findByUserId(userId: number): Promise<FriendDto[]> {
    const friends = await Friend.findAll({
      where: { [Op.or]: [{ requesterId: userId }, { addresseeId: userId }] },
      include: [
        { model: User, as: 'addressee' },
        { model: User, as: 'requester' },
      ],
    });

    return friends.map((f) => new FriendDto(f));
  }

  public async acceptFriendRequest(
    userId: number,
    friendId: number,
  ): Promise<FriendDto> {
    const friendRequest = await Friend.findByPk(friendId, {
      include: [
        { model: User, as: 'addressee' },
        { model: User, as: 'requester' },
      ],
    });

    if (friendRequest == null) throw ERROR_FRIEND_REQUEST_NOT_FOUND;
    if (friendRequest.addresseeId !== userId)
      throw ERROR_FRIEND_REQUEST_INSUFFICIENT_PERMISSIONS;
    if (friendRequest.accepted === true) return new FriendDto(friendRequest);

    const updatedFriendRequest = await friendRequest.update({
      accepted: true,
      acceptedAt: DateUtils.UTC(),
    });

    return new FriendDto(updatedFriendRequest);
  }
}

export default FriendService;
