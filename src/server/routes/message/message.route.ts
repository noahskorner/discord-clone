import { Router } from 'express';
import MessageController from '../../controllers/message';
import authenticate from '../../middleware/authenticate';

const messageController = new MessageController();

const messageRouter = Router();
messageRouter.post('/', authenticate, messageController.create);

export default messageRouter;
