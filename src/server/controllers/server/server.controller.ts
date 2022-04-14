import catchAsync from '../../middleware/catch-async';
import ServerService from '../../services/server.service';
import ServerValidator from '../../validators/server.validator';
import { Request, Response } from 'express';

class ServerController {
  private _serverService;

  constructor() {
    this._serverService = new ServerService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const validationErrors = ServerValidator.create({ ...req.body });
    if (validationErrors.length > 0) {
      return res.status(400).json(validationErrors);
    }

    const { name } = req.body;
    const { errors, server } = await this._serverService.create(
      name,
      req.user.id,
    );

    if (errors != null) return res.status(400).json(errors);
    if (server == null) return res.sendStatus(500);

    return res.status(201).json(server);
  });

  public index = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const servers = await this._serverService.findAllByUserId(userId);

    return res.status(200).json(servers);
  });
}

export default ServerController;
