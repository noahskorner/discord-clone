import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import MessageType from '../../../utils/enums/message-type';
import DirectMessage from './direct-message.model';
import ServerInvite from './server-invite.model';
import User from './user.model';

@Table({ tableName: 'message', underscored: true })
class Message extends Model {
  @Column(DataType.INTEGER)
  type!: MessageType;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  senderId!: number;

  @BelongsTo(() => User)
  sender!: User;

  @Column(DataType.STRING)
  body!: string;

  @ForeignKey(() => DirectMessage)
  @AllowNull
  @Column(DataType.INTEGER)
  directMessageId!: number;

  @BelongsTo(() => DirectMessage)
  directMessage!: DirectMessage;

  @ForeignKey(() => ServerInvite)
  @AllowNull
  @Column(DataType.INTEGER)
  serverInviteId!: number;

  @BelongsTo(() => ServerInvite)
  serverInvite!: ServerInvite;
}

export default Message;
