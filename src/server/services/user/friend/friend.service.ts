import DateUtils from '../../../../utils/date-utils';
import ErrorEnum from '../../../../utils/enums/errors';
import FriendDto from '../../../../utils/types/dtos/friend';
import SystemError from '../../../../utils/types/interfaces/system-error';
import Friend from '../../../db/models/friend.model';
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
    const addressee = await this._userService.findUserByEmail(addresseeEmail);
    if (addressee == null) throw ERROR_ADDRESSEE_NOT_FOUND;
    if (addressee.id === requesterId) throw ERROR_FRIENDS_WITH_SELF;

    const friendExists = await Friend.findOne({
      where: {
        requesterId,
        addresseeId: addressee.id,
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
    friend.addressee = addressee;

    return new FriendDto(friend);
  }
}

export default FriendService;
