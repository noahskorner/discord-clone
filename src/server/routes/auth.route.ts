import { Router } from 'express';
import AuthController from '../controllers/auth';
import authenticate from '../middleware/authenticate';

const authController = new AuthController();

const authRouter = Router();
authRouter.get('/', authController.refreshToken);
authRouter.post('/', authController.login);
authRouter.delete('/', authenticate, authController.logout);

export default authRouter;
