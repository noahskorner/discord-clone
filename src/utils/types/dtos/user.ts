import User from '../../../server/db/models/user.model';
import RoleEnum from '../../enums/roles';
import FriendDto from './friend';

class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public updatedAt: string;
  public createdAt: string;
  public roles: RoleEnum[];
  public friendRequests: FriendDto[];

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.updatedAt;
    this.roles =
      user.roles == null
        ? []
        : user.roles.map((userRole) => userRole.role as RoleEnum);
    this.friendRequests =
      user.friends == null
        ? []
        : user.friends.map((friend) => new FriendDto(friend));
  }
}

export default UserDto;
