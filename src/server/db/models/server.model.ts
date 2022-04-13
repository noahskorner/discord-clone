import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import ServerUser from './server-user.model';
import User from './user.model';

@Table({ tableName: 'server', underscored: true })
class Server extends Model {
  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdById!: number;

  @BelongsTo(() => User)
  createdBy!: User;

  @HasMany(() => ServerUser)
  users!: ServerUser[];
}

export default Server;
