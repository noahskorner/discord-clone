import { Sequelize } from 'sequelize-typescript';
import env from './env.config';

const sequelize =
  env.DATABASE_URL.length > 0
    ? new Sequelize(env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      })
    : new Sequelize(env.DATABASE, env.DB_USER, env.DB_PASSWORD, {
        host: env.DB_HOST,
        dialect: 'postgres',
        logging: false,
      });

export default sequelize;
