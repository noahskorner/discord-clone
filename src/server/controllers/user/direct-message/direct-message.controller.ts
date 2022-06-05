import { Request, Response } from 'express';
import { ERROR_UNKOWN } from '../../../../utils/constants/errors';
import ErrorEnum from '../../../../utils/enums/errors';
import catchAsync from '../../../middleware/catch-async';
import DirectMessageService from '../../../services/user/direct-message/direct-message.service';

class DirectMessageController {
  private _directMessageService;

  constructor() {
    this._directMessageService = new DirectMessageService();
  }

  public get = catchAsync(async (req: Request, res: Response) => {
    try {
      const directMessageId = parseInt(req.params.directMessageId);
      const directMessage = await this._directMessageService.findById(
        directMessageId,
        req.user.id,
      );

      res.status(200).json(directMessage);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.DIRECT_MESSAGE_USER_NOT_FOUND:
          return res.status(403).json(e.errors);
        case ErrorEnum.DIRECT_MESSAGE_NOT_FOUND:
          return res.status(404).json(e.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    try {
      const createDirectMessageRequest = {
        userId: req.user.id,
        friendIds: req.body.friendIds,
      };
      const { errors, directMessage } =
        await this._directMessageService.createDirectMessage(
          createDirectMessageRequest,
        );

      if (errors != null && errors.length > 0)
        return res.status(400).json(errors);
      if (directMessage == null) return res.status(500).json([ERROR_UNKOWN]);

      res.status(201).json(directMessage);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.CREATE_DIRECT_MESSAGE_NOT_FRIENDS_WITH_ENTIRE_GROUP:
          return res.status(403).json(e.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}
export default DirectMessageController;
