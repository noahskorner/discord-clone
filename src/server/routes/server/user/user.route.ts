import { Router } from 'express';
import ServerUserController from '../../../controllers/server/user/user.controller';
import authenticate from '../../../middleware/authenticate';

const serverUserController = new ServerUserController();

const serverUserRouter = Router({ mergeParams: true });
serverUserRouter.post('/', authenticate, serverUserController.create);

export default serverUserRouter;
