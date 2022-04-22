import { Router } from 'express';
import ServerController from '../../controllers/server';
import authenticate from '../../middleware/authenticate';
import channelRouter from './channel';

const serverController = new ServerController();

const serverRouter = Router();
serverRouter.post('/', authenticate, serverController.create);
serverRouter.get('/', authenticate, serverController.index);
serverRouter.get('/:id', authenticate, serverController.get);
serverRouter.use('/:id/channel', channelRouter);

export default serverRouter;
