import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from '../../config/env.config';
import RequestUser from '../../utils/types/dtos/request-user';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as RequestUser;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export default authenticate;
