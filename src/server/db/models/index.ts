import sequelize from '../../../config/db.config';
import Sequelize from 'sequelize';
import User from './user.model';
import RefreshToken from './refresh-token.model';
import UserRole from './user-role.model';
import Server from './server.model';
import ServerUser from './server-user.model';
import Channel from './channel.model';
import Friend from './friend.model';

sequelize.addModels([
  User,
  RefreshToken,
  UserRole,
  Server,
  ServerUser,
  Channel,
  Friend,
]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  UserRole,
  Server,
  ServerUser,
  Channel,
  Friend,
};

export default db;
