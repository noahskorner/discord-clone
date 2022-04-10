import { Router } from 'express';
import UserController from '../controllers/user';
import authenticate from '../middleware/authenticate';

const userController = new UserController();

const userRouter = Router();
userRouter.post('/', userController.register);
userRouter.put('/verify-email/:token', userController.verifyEmail);
userRouter.get('/:id', authenticate, userController.getUser);
userRouter.put('/reset-password', userController.resetPassword);
userRouter.put(
  '/reset-password/confirm/:token',
  userController.confirmResetPassword,
);

export default userRouter;
