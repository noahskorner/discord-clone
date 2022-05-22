import { Router } from 'express';
import FriendController from '../../../controllers/user/friend';
import authenticate from '../../../middleware/authenticate';

const friendController = new FriendController();

const friendRouter = Router({ mergeParams: true });
friendRouter.post('/', authenticate, friendController.create);
friendRouter.put('/:friendId', authenticate, friendController.update);
friendRouter.delete('/:friendId', authenticate, friendController.delete);

export default friendRouter;
