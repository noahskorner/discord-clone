import Invitable from '../../../server/db/models/invitable';

class InvitableDto {
  public id: number;
  public requester: {
    id: number;
    email: string;
    username: string;
  };
  public addressee: {
    id: number;
    email: string;
    username: string;
  };
  public accepted: boolean;
  public requestedAt: Date;
  public acceptedAt: Date;

  constructor(invite: Invitable) {
    this.id = invite.id;
    this.requester = {
      id: invite.requesterId,
      email: invite.requester.email,
      username: invite.requester.username,
    };
    this.addressee = {
      id: invite.addresseeId,
      email: invite.addressee.email,
      username: invite.addressee.username,
    };
    this.accepted = invite.accepted;
    this.requestedAt = invite.requestedAt;
    this.acceptedAt = invite.acceptedAt;
  }
}

export default InvitableDto;
