import Server from '../../../server/db/models/server.model';
import ChannelDto from './channel';
import ServerUserDto from './server-user';

class ServerDto {
  public id: number;
  public name: string;
  public createdAt: string;
  public updatedAt: string;
  public users: ServerUserDto[];
  public channels: ChannelDto[];

  constructor(server: Server) {
    this.id = server.id;
    this.name = server.name;
    this.createdAt = server.createdAt;
    this.updatedAt = server.updatedAt;
    this.users =
      server.users == null
        ? []
        : server.users.map((serverUser) => new ServerUserDto(serverUser));
    this.channels =
      server.channels == null
        ? []
        : server.channels.map((channel) => new ChannelDto(channel));
  }
}

export default ServerDto;
