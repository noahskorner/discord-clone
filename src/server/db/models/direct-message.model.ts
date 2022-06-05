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
import Message from './message.model';
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

  @HasMany(() => Message)
  messages!: Message[];
}

export default DirectMessage;
