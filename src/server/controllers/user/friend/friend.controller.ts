import catchAsync from '../../../middleware/catch-async';
import FriendService from '../../../services/user/friend';
import FriendValidator from '../../../validators/user/friend/friend.validator';
import { Request, Response } from 'express';

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

    return res.status(200).send();
  });
}
export default FriendController;
