import catchAsync from '../../../middleware/catch-async';
import FriendService from '../../../services/user/friend';
import FriendValidator from '../../../validators/user/friend/friend.validator';
import { Request, Response } from 'express';
import ErrorEnum from '../../../../utils/enums/errors';
import { ERROR_UNKOWN } from '../../../../utils/constants/errors';

class FriendController {
  private _friendService;

  constructor() {
    this._friendService = new FriendService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const validationResult = FriendValidator.create({ ...req.body });
    if (validationResult.length > 0) {
      return res.status(400).json(validationResult);
    }

    try {
      const friend = await this._friendService.createFriendRequest({
        requesterId: req.user.id,
        addresseeEmail: req.body.addresseeEmail,
      });

      return res.status(200).json(friend);
    } catch (error: any) {
      switch (error.type) {
        case ErrorEnum.ADDRESSEE_NOT_FOUND:
        case ErrorEnum.FRIENDS_WITH_SELF:
        case ErrorEnum.FRIEND_REQUEST_ALREADY_EXISTS:
          return res.status(400).json(error.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });

  public update = catchAsync(async (req: Request, res: Response) => {
    try {
      const friendId = parseInt(req.params.friendId);
      const friend = await this._friendService.acceptFriendRequest(
        req.user.id,
        friendId,
      );

      return res.status(200).json(friend);
    } catch (error: any) {
      switch (error.type) {
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}
export default FriendController;
