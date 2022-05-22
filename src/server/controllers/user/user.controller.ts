import UserService from '../../services/user/user.service';
import catchAsync from '../../middleware/catch-async';
import { Request, Response } from 'express';
import UserValidator from '../../validators/user';
import CreateUserRequest from '../../../utils/types/requests/user/create-user';
import ResetPasswordRequest from '../../../utils/types/requests/user/reset-password';
import ConfirmResetPasswordRequest from '../../../utils/types/requests/user/confirm-reset-password';
import FriendRequestDto from '../../../utils/types/dtos/friend-request';
import FriendService from '../../services/user/friend';

class UserController {
  private _userService;
  private _friendService;

  constructor() {
    this._userService = new UserService();
    this._friendService = new FriendService();
  }

  public register = catchAsync(async (req: Request, res: Response) => {
    const validationResult = UserValidator.register({ ...req.body });
    if (validationResult.length > 0) {
      return res.status(400).json(validationResult);
    }

    const { username, email, password } = req.body as CreateUserRequest;
    const { user, errors } = await this._userService.createUser(
      username,
      email,
      password,
    );

    if (errors != null) return res.status(400).json(errors);
    if (user == null) return res.sendStatus(500);

    return res.status(201).json(user);
  });

  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const token = req.params.token;

    const errors = await this._userService.verifyEmail(token);
    if (errors != null) return res.status(400).json(errors);

    return res.sendStatus(200);
  });

  public getUser = catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) return res.sendStatus(403);

    const user = await this._userService.findUserById(userId);
    if (user === null) return res.sendStatus(400);

    user.friendRequests = await this._friendService.findByUserId(userId);

    return res.status(200).json(user);
  });

  public resetPassword = catchAsync(async (req: Request, res: Response) => {
    const validationErrors = UserValidator.resetPassword({ ...req.body });
    if (validationErrors.length > 0)
      return res.status(400).json(validationErrors);

    const { email } = req.body as ResetPasswordRequest;
    await this._userService.resetPassword(email);

    return res.sendStatus(200);
  });

  public confirmResetPassword = catchAsync(
    async (req: Request, res: Response) => {
      const validationErrors = UserValidator.confirmResetPassword({
        ...req.body,
      });
      if (validationErrors.length > 0)
        return res.status(400).json(validationErrors);

      const { token } = req.params;
      const { password } = req.body as ConfirmResetPasswordRequest;
      const errors = await this._userService.confirmResetPassword(
        token,
        password,
      );
      if (errors != null) return res.status(400).json(errors);

      return res.sendStatus(200);
    },
  );
}
export default UserController;
