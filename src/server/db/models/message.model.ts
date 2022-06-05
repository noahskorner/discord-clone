import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
} from 'sequelize-typescript';
import MessageType from '../../../utils/enums/message-type';
import Friend from './friend.model';
import User from './user.model';

class Message extends Model {
  @Column(DataType.INTEGER)
  type!: MessageType;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  senderId!: number;

  @BelongsTo(() => User)
  sender!: User;

  @ForeignKey(() => Friend)
  @AllowNull
  @Column(DataType.INTEGER)
  friendRequestId!: number;

  @HasOne(() => Friend)
  friendRequest!: Friend;
}

export default Message;
