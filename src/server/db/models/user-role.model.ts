import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import RoleEnum from '../../../utils/enums/roles';
import User from './user.model';

const ROLE_ENUM = Object.values(RoleEnum).map((role) => role.toString());

@Table({ tableName: 'user_role', underscored: true })
class UserRole extends Model {
  @PrimaryKey
  @Column(DataType.ENUM(...ROLE_ENUM))
  role!: string;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default UserRole;
