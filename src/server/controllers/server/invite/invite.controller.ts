import catchAsync from '../../../middleware/catch-async';
import { Request, Response } from 'express';
import { ERROR_UNKOWN } from '../../../../utils/constants/errors';
import ServerInviteService from '../../../services/server/invite/invite.service';
import ErrorEnum from '../../../../utils/enums/errors';

class ServerInviteController {
  private _serverInviteService: ServerInviteService;

  constructor() {
    this._serverInviteService = new ServerInviteService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const serverId = parseInt(req.params.serverId);
    const { friendId } = req.body;

    try {
      const { errors, serverInvite } = await this._serverInviteService.create({
        userId,
        serverId,
        friendId,
      });
      if (errors != null) return res.status(400).json(errors);

      return res.status(201).json(serverInvite);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.INVITE_SERVER_USER_ALREADY_EXISTS:
        case ErrorEnum.FRIEND_REQUEST_NOT_FOUND:
          return res.status(400).json(e.errors);
        case ErrorEnum.INVITE_SERVER_USER_INSUFFICIENT_PERMISSIONS:
          return res.status(403).json(e.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}

export default ServerInviteController;
