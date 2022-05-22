import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'friend', underscored: true })
class Friend extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  requesterId!: number;

  @BelongsTo(() => User, 'requester_id')
  requester!: User;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  addresseeId!: number;

  @BelongsTo(() => User, 'addressee_id')
  addressee!: User;

  @Column(DataType.BOOLEAN)
  accepted!: boolean;

  @AllowNull(false)
  @Column(DataType.DATE)
  requestedAt!: Date;

  @Column(DataType.DATE)
  acceptedAt!: Date;
}

export default Friend;
