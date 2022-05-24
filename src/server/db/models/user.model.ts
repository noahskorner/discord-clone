import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';
import DirectMessageUser from './direct-message-user.model';
import DirectMessage from './direct-message.model';
import Friend from './friend.model';
import RefreshToken from './refresh-token.model';
import ServerUser from './server-user.model';
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

  @HasMany(() => ServerUser)
  servers!: ServerUser[];

  @HasMany(() => Friend)
  friends!: Friend[];

  @HasMany(() => DirectMessage)
  createdDirectMessages!: DirectMessage[];

  @HasMany(() => DirectMessageUser)
  directMessages!: DirectMessageUser[];
}

export default User;
