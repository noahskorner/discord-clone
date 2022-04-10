import sequelize from '../../../config/db.config';
import Sequelize from 'sequelize';
import User from './user.model';
import RefreshToken from './refresh-token.model';
import UserRole from './user-role.model';

sequelize.addModels([User, RefreshToken, UserRole]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  UserRole,
};

export default db;
