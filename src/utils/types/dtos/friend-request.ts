import Friend from '../../../server/db/models/friend.model';

interface FriendRequestInterface {
  id: number;
  email: string;
  username: string;
}

class FriendRequestDto {
  public id: number;
  public requester: FriendRequestInterface;
  public addressee: FriendRequestInterface;
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

export default FriendRequestDto;
