import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'server', underscored: true })
class Server extends Model {
  @Unique(true)
  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdBy!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Server;
