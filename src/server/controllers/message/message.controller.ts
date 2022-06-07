import catchAsync from '../../middleware/catch-async';
import { Request, Response } from 'express';
import MessageService from '../../services/message';
import { ERROR_UNKOWN } from '../../../utils/constants/errors';
import ErrorEnum from '../../../utils/enums/errors';

class MessageController {
  private _messageService: MessageService;

  constructor() {
    this._messageService = new MessageService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    try {
      const { message, errors } = await this._messageService.create(
        req.user.id,
        { ...req.body },
      );
      if (errors != null) return res.status(400).json(errors);

      return res.status(201).json(message);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.DIRECT_MESSAGE_USER_NOT_FOUND:
          return res.status(403).json(e.errors);
        default: {
          return res.status(500).json([ERROR_UNKOWN]);
        }
      }
    }
  });

  public index = catchAsync(async (req: Request, res: Response) => {
    try {
      const directMessageId = parseInt(req.query.directMessageId as string);
      const skip = parseInt(req.query.skip as string);
      const take = parseInt(req.query.take as string);

      const messages = await this._messageService.findAllByDirectMessageId(
        req.user.id,
        directMessageId,
        skip,
        take,
      );

      res.status(200).json(messages);
    } catch (e: any) {
      switch (e.type) {
        case ErrorEnum.DIRECT_MESSAGE_USER_NOT_FOUND:
          return res.status(403).json(e.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}

export default MessageController;
