import User from '../../../server/db/models/user.model';
import RoleEnum from '../../enums/roles';

class RequestUser {
  public id: number;
  public email: string;
  public roles: RoleEnum[];

  constructor({ id, email, roles }: User) {
    this.id = id;
    this.email = email;
    this.roles =
      roles == null ? [] : roles.map((userRole) => userRole.role as RoleEnum);
  }

  public toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      roles: this.roles,
    };
  };
}

export default RequestUser;
