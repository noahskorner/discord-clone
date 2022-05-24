import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import DirectMessageUser from './direct-message-user.model';
import User from './user.model';

@Table({ tableName: 'direct_message', underscored: true })
class DirectMessage extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdById!: number;

  @BelongsTo(() => User)
  createdBy!: User;

  @HasMany(() => DirectMessageUser)
  users!: DirectMessageUser[];
}

export default DirectMessage;
