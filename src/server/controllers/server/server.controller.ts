import catchAsync from '../../middleware/catch-async';
import ServerService, {
  ERROR_INSUFFICIENT_PERMISSIONS,
  ERROR_SERVER_NOT_FOUND,
} from '../../services/server.service';
import ServerValidator from '../../validators/server.validator';
import { Request, Response } from 'express';
import { ERROR_UNKOWN } from '../../../utils/constants/errors';
import asErrors from '../../../utils/functions/as-errors';

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

  public get = catchAsync(async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const id = parseInt(req.params.id);

      const server = await this._serverService.findById(id, userId);

      return res.status(200).json(server);
    } catch (error: any) {
      switch (error.message) {
        case ERROR_SERVER_NOT_FOUND:
          return res.status(400).json(asErrors(ERROR_SERVER_NOT_FOUND));
        case ERROR_INSUFFICIENT_PERMISSIONS:
          return res.status(403).json(asErrors(ERROR_INSUFFICIENT_PERMISSIONS));
        default:
          return res.status(500).json([ERROR_UNKOWN]);
      }
    }
  });
}

export default ServerController;
