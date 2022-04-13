import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  Unique,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'server', underscored: true })
class Server extends Model {
  @Unique(true)
  @Column(DataType.STRING)
  name!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdById!: number;

  @BelongsTo(() => User)
  createdBy!: User;
}

export default Server;
