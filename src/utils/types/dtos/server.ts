import Server from '../../../server/db/models/server.model';
import UserDTO from './user';

class ServerDTO {
  public id: string;
  public name: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: UserDTO;

  constructor(server: Server) {
    this.id = server.id;
    this.name = server.name;
    this.createdAt = server.createdAt;
    this.updatedAt = server.updatedAt;
    this.createdBy = new UserDTO(server.createdBy);
  }
}

export default ServerDTO;
