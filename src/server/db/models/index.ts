import sequelize from '../../../config/db.config';
import Sequelize from 'sequelize';
import User from './user.model';
import RefreshToken from './refresh-token.model';
import UserRole from './user-role.model';
import Server from './server.model';

sequelize.addModels([User, RefreshToken, UserRole, Server]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  UserRole,
  Server,
};

export default db;
