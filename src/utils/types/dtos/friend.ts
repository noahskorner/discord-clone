import Friend from '../../../server/db/models/friend.model';

class FriendDto {
  public id: number;
  public email: string;
  public accepted: boolean;
  public requestedAt: Date;
  public acceptedAt: Date;

  constructor(friend: Friend) {
    this.id = friend.addresseeId;
    this.email = friend.addressee.email;
    this.accepted = friend.accepted;
    this.requestedAt = friend.requestedAt;
    this.acceptedAt = friend.acceptedAt;
  }
}

export default FriendDto;
