import { Router } from 'express';
import DirectMessageController from '../../../controllers/user/direct-message/direct-message.controller';
import authenticate from '../../../middleware/authenticate';

const directMessageController = new DirectMessageController();

const directMessageRouter = Router({ mergeParams: true });
directMessageRouter.get(
  '/:directMessageId',
  authenticate,
  directMessageController.get,
);
directMessageRouter.post('/', authenticate, directMessageController.create);

export default directMessageRouter;
