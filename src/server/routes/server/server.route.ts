import { Router } from 'express';
import ServerController from '../../controllers/server';
import authenticate from '../../middleware/authenticate';
import channelRouter from './channel';
import inviteRouter from './invite';

const serverController = new ServerController();

const serverRouter = Router();
serverRouter.post('/', authenticate, serverController.create);
serverRouter.get('/', authenticate, serverController.index);
serverRouter.get('/:serverId', authenticate, serverController.get);
serverRouter.use('/:serverId/channel', channelRouter);
serverRouter.use('/:serverId/invite', inviteRouter);

export default serverRouter;
