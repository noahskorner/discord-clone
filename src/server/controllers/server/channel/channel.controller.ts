import catchAsync from '../../../middleware/catch-async';
import ChannelService from '../../../services/server/channel';
import { Request, Response } from 'express';
import ChannelValidator from '../../../validators/server/channel';

class ChannelController {
  private _channelService;

  constructor() {
    this._channelService = new ChannelService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const validationErrors = ChannelValidator.create({ ...req.body });
    if (validationErrors) {
      return res.status(400).json(validationErrors);
    }

    return res.sendStatus(201);
  });
}

export default ChannelController;
