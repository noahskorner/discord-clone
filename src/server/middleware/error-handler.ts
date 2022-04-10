import { Errback, Response, NextFunction, Request } from 'express';
import { ERROR_UNKOWN } from '../../utils/constants/errors';
import ErrorInterface from '../../utils/types/interfaces/error';

const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const errors: ErrorInterface[] = [ERROR_UNKOWN];
  return res.status(500).json(errors);
};

export default errorHandler;
