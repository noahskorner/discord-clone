import User from '../../../server/db/models/user.model';
import RoleEnum from '../../enums/roles';

class UserDTO {
  private id: number;
  private email: string;
  private updatedAt: string;
  private createdAt: string;
  private roles: RoleEnum[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.updatedAt;
    this.roles =
      user.roles == null
        ? []
        : user.roles.map((userRole) => userRole.role as RoleEnum);
  }
}

export default UserDTO;
