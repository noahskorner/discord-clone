import { Router } from 'express';
import FriendController from '../../../controllers/user/friend';
import authenticate from '../../../middleware/authenticate';

const friendController = new FriendController();

const friendRouter = Router({ mergeParams: true });
friendRouter.post('/', authenticate, friendController.create);

export default friendRouter;
