import express from 'express';
import errorHandler from './middleware/error-handler';
import cookieParser from 'cookie-parser';
import RequestUser from '../utils/types/dtos/request-user';
import apiLimiter from '../config/api.config';
import cors from 'cors';
import env from '../config/env.config';
import router from './routes';
import db from './db/models';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user: RequestUser;
    }
  }
}

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use('/api', apiLimiter);
app.use(cookieParser());
app.use(
  cors({
    origin: [env.HOST],
  }),
);
app.use('/api/v1', router);
app.use(errorHandler);

// DATABASE
db.sequelize.sync();
// if (process.env.NODE_ENV !== 'production') {
//   db.sequelize.sync({ force: true }).then(() => {
//     console.log('Dropping, re-syncing, and seeding database');
//     require('./db').default();
//   });
// }

export default app;
