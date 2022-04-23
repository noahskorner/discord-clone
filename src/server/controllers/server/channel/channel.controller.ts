import catchAsync from '../../../middleware/catch-async';
import ChannelService from '../../../services/server/channel';
import { Request, Response } from 'express';
import { ERROR_UNKOWN } from '../../../../utils/constants/errors';
import ErrorEnum from '../../../../utils/enums/errors';

class ChannelController {
  private _channelService;

  constructor() {
    this._channelService = new ChannelService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    try {
      const serverId = req.params.serverId;
      const userId = req.user.id;
      const { type, name } = req.body;
      const { errors, channel } = await this._channelService.create({
        serverId,
        userId,
        type,
        name,
      });

      if (errors != null) return res.status(400).json(errors);
      if (channel == null) return res.status(500).json([ERROR_UNKOWN]);

      return res.status(201).json(channel);
    } catch (error: any) {
      switch (error.type) {
        case ErrorEnum.SERVER_NOT_FOUND:
          return res.status(400).json(error.errors);
        case ErrorEnum.INSUFFICIENT_PERMISIONS:
          return res.status(403).json(error.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });

  public get = catchAsync(async (req: Request, res: Response) => {
    try {
      const channelId = parseInt(req.params.channelId);
      const userId = req.user.id;

      const channel = await this._channelService.findById({
        channelId,
        userId,
      });

      if (channel == null) return res.status(500).json([ERROR_UNKOWN]);

      return res.status(201).json(channel);
    } catch (error: any) {
      switch (error.type) {
        case ErrorEnum.CHANNEL_NOT_FOUND:
          return res.status(400).json(error.errors);
        case ErrorEnum.INSUFFICIENT_PERMISIONS:
          return res.status(403).json(error.errors);
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}

export default ChannelController;
