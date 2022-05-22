import Friend from '../../../server/db/models/friend.model';

interface FriendInterface {
  id: number;
  email: string;
  username: string;
}

class FriendDto {
  public id: number;
  public requester: FriendInterface;
  public addressee: FriendInterface;
  public accepted: boolean;
  public requestedAt: Date;
  public acceptedAt: Date;

  constructor(friend: Friend) {
    this.id = friend.id;
    this.requester = {
      id: friend.requesterId,
      email: friend.requester.email,
      username: friend.requester.username,
    };
    this.addressee = {
      id: friend.addresseeId,
      email: friend.addressee.email,
      username: friend.addressee.username,
    };
    this.accepted = friend.accepted;
    this.requestedAt = friend.requestedAt;
    this.acceptedAt = friend.acceptedAt;
  }
}

export default FriendDto;
