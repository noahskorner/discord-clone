import { Router } from 'express';
import RoleEnum from '../../utils/enums/roles';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import authRouter from './auth/auth.route';
import messageRouter from './message';
import serverRouter from './server/server.route';
import userRouter from './user/user.route';

const router = Router();
router.get('/', authenticate, authorize([RoleEnum.SUPERADMIN]), (req, res) => {
  return res.sendStatus(200);
});
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/server', serverRouter);
router.use('/message', messageRouter);

export default router;
