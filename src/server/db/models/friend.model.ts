import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'friend', underscored: true })
class Friend extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  requesterId!: number;

  @BelongsTo(() => User)
  requester!: User;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  addresseeId!: number;

  @BelongsTo(() => User)
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
