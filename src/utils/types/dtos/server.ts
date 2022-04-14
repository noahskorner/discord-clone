import Server from '../../../server/db/models/server.model';
import ServerUserDto from './server-user';

class ServerDTO {
  public id: number;
  public name: string;
  public createdAt: string;
  public updatedAt: string;
  public users: ServerUserDto[];

  constructor(server: Server) {
    this.id = server.id;
    this.name = server.name;
    this.createdAt = server.createdAt;
    this.updatedAt = server.updatedAt;
    this.users =
      server.users == null
        ? []
        : server.users.map((serverUser) => new ServerUserDto(serverUser));
  }
}

export default ServerDTO;
