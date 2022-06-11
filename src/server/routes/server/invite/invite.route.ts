import { Router } from 'express';
import ServerInviteController from '../../../controllers/server/invite/invite.controller';
import authenticate from '../../../middleware/authenticate';

const inviteController = new ServerInviteController();

const inviteRouter = Router({ mergeParams: true });
inviteRouter.post('/', authenticate, inviteController.create);

export default inviteRouter;
