import sequelize from '../../../config/db.config';
import Sequelize from 'sequelize';
import User from './user.model';
import RefreshToken from './refresh-token.model';
import UserRole from './user-role.model';
import Server from './server.model';
import ServerUser from './server-user.model';

sequelize.addModels([User, RefreshToken, UserRole, Server, ServerUser]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  UserRole,
  Server,
  ServerUser,
};

export default db;
