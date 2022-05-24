import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import DirectMessage from './direct-message.model';
import User from './user.model';

@Table({ tableName: 'direct_message_user', underscored: true })
class DirectMessageUser extends Model {
  @PrimaryKey
  @ForeignKey(() => DirectMessage)
  @Column(DataType.INTEGER)
  directMessageId!: number;

  @BelongsTo(() => DirectMessage)
  directMessage!: DirectMessage;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default DirectMessageUser;
