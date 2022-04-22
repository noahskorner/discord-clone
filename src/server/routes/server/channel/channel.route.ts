import { Router } from 'express';
import ChannelController from '../../../controllers/server/channel';
import authenticate from '../../../middleware/authenticate';

const channelController = new ChannelController();

const channelRouter = Router();
channelRouter.post('/', authenticate, channelController.create);

export default channelRouter;
