import catchAsync from '../../../middleware/catch-async';
import { Request, Response } from 'express';
import { ERROR_UNKOWN } from '../../../../utils/constants/errors';
import ServerUserService from '../../../services/server/user/user.service';
import ErrorEnum from '../../../../utils/enums/errors';

class ServerUserController {
  private _serverUserService: ServerUserService;

  constructor() {
    this._serverUserService = new ServerUserService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { serverInviteId } = req.body;

    try {
      const serverUser = await this._serverUserService.create({
        userId,
        serverInviteId,
      });

      return res.status(201).json(serverUser);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.NOT_INVITED:
          return res.status(403).json(e.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}
export default ServerUserController;
