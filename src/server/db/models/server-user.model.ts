import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ServerRoleEnum from '../../../utils/enums/server-roles';
import Server from './server.model';
import User from './user.model';

const SERVER_ROLE_ENUM = Object.values(ServerRoleEnum).map((role) =>
  role.toString(),
);

@DefaultScope(() => ({
  include: [
    {
      model: User,
    },
  ],
}))
@Table({ tableName: 'server_user', underscored: true })
class ServerUser extends Model {
  @PrimaryKey
  @ForeignKey(() => Server)
  @Column(DataType.INTEGER)
  serverId!: number;

  @BelongsTo(() => Server)
  server!: Server;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column(DataType.ENUM(...SERVER_ROLE_ENUM))
  role!: string;
}

export default ServerUser;
