import { Router } from 'express';
import RoleEnum from '../../utils/enums/roles';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import authRouter from './auth.route';
import userRouter from './user.route';

const router = Router();
router.get('/', authenticate, authorize([RoleEnum.SUPERADMIN]), (req, res) => {
  return res.sendStatus(200);
});
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
