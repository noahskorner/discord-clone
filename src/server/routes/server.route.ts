import { Router } from 'express';
import ServerController from '../controllers/server';
import authenticate from '../middleware/authenticate';

const serverController = new ServerController();

const serverRouter = Router();
serverRouter.post('/', authenticate, serverController.create);
serverRouter.get('/', authenticate, serverController.index);

export default serverRouter;
