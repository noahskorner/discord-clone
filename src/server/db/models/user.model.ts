import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';
import RefreshToken from './refresh-token.model';
import ServerUser from './server-user.model';
import Server from './server.model';
import UserRole from './user-role.model';

@DefaultScope(() => ({
  include: [
    {
      model: UserRole,
    },
  ],
}))
@Table({ tableName: 'user', underscored: true })
class User extends Model {
  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  verificationToken!: string;

  @Column(DataType.STRING)
  passwordResetToken!: string;

  @HasMany(() => RefreshToken, {
    onDelete: 'CASCADE',
  })
  refreshTokens!: RefreshToken[];

  @HasMany(() => UserRole, {
    onDelete: 'CASCADE',
  })
  roles!: UserRole[];

  @HasMany(() => Server, {
    onDelete: 'SET NULL',
  })
  createdServers!: Server[];

  @HasMany(() => ServerUser)
  servers!: ServerUser[];
}

export default User;
