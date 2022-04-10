import catchAsync from '../../middleware/catch-async';
import { Request, Response } from 'express';
import AuthValidator from '../../validators/auth.validator';
import UserService from '../../services/user.service';
import jwtDecode from 'jwt-decode';
import JwtToken from '../../../utils/types/interfaces/jwt-token';

const REFRESH_TOKEN_COOKIE = 'token';

class AuthController {
  private _userService = new UserService();

  public login = catchAsync(async (req: Request, res: Response) => {
    const validationErrors = AuthValidator.login({ ...req.body });
    if (validationErrors.length > 0) {
      return res.status(400).json(validationErrors);
    }

    const { email, password } = req.body;
    const { errors, accessToken, refreshToken } =
      await this._userService.loginUser(email, password);

    if (errors != null) return res.status(400).json(errors);
    if (accessToken == null) return res.sendStatus(500);
    if (refreshToken == null) return res.sendStatus(500);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: this.getTokenExpirationDate(refreshToken),
    });
    return res.status(200).json(accessToken);
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.cookies as { token?: string };
    if (token == null) return res.sendStatus(401);

    const result = await this._userService.refreshToken(token);
    if (result == null) return res.sendStatus(401);

    const { accessToken, refreshToken } = result;
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: this.getTokenExpirationDate(refreshToken),
    });
    return res.status(200).json(accessToken);
  });

  public logout = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.cookies as { token?: string };
    if (token == null) return res.sendStatus(401);

    await this._userService.logoutUser(token);

    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return res.sendStatus(200);
  });

  private getTokenExpirationDate = (token: string) => {
    const { exp } = jwtDecode<JwtToken>(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);

    return expirationDate;
  };
}

export default AuthController;
