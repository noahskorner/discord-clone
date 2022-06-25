import { Router } from 'express';
import ServerController from '../../controllers/server';
import authenticate from '../../middleware/authenticate';
import userRouter from './user';
import channelRouter from './channel';
import inviteRouter from './invite';

const serverController = new ServerController();

const serverRouter = Router();
serverRouter.post('/', authenticate, serverController.create);
serverRouter.get('/', authenticate, serverController.index);
serverRouter.get('/:serverId', authenticate, serverController.get);
serverRouter.use('/:serverId/channel', channelRouter);
serverRouter.use('/:serverId/invite', inviteRouter);
serverRouter.use('/:serverId/user', userRouter);

export default serverRouter;
