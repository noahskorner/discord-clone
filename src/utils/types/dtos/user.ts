import User from '../../../server/db/models/user.model';
import RoleEnum from '../../enums/roles';
import DirectMessageDto from './direct-message';
import FriendRequestDto from './friend-request';
import ServerInviteDto from './server-invite';

class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public updatedAt: string;
  public createdAt: string;
  public roles: RoleEnum[];
  public friendRequests: FriendRequestDto[];
  public directMessages: DirectMessageDto[];
  public serverInvites: ServerInviteDto[] = [];

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
        : user.friends.map((friend) => new FriendRequestDto(friend));
    this.directMessages =
      user.directMessages == null
        ? []
        : user.directMessages.map(
            (directMessage) => new DirectMessageDto(directMessage),
          );
  }
}

export default UserDto;
