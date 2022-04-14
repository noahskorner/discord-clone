import ServerUser from '../../../server/db/models/server-user.model';
import ServerRoleEnum from '../../enums/server-roles';

class ServerUserDto {
  public id: number;
  public role: ServerRoleEnum;
  public username: string;
  public email: string;

  constructor(serverUser: ServerUser) {
    this.id = serverUser.user.id;
    this.role = serverUser.role as ServerRoleEnum;
    this.username = serverUser.user.username;
    this.email = serverUser.user.email;
  }
}

export default ServerUserDto;
