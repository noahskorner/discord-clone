import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Server from './server.model';
import User from './user.model';

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
}

export default ServerUser;
