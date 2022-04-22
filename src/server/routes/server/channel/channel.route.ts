import { Router } from 'express';
import ChannelController from '../../../controllers/server/channel';
import authenticate from '../../../middleware/authenticate';

const channelController = new ChannelController();

const channelRouter = Router({ mergeParams: true });
channelRouter.post('/', authenticate, channelController.create);

export default channelRouter;
