import ServerInvite from '../../../server/db/models/server-invite.model';
import InvitableDto from './invitable';

class ServerInviteDto extends InvitableDto {
  public serverId: number;

  constructor(serverInvite: ServerInvite) {
    super(serverInvite);
    this.serverId = serverInvite.serverId;
  }
}

export default ServerInviteDto;
