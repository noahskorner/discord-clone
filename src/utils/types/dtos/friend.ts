class FriendDto {
  public friendId: number;
  public id: number;
  public username: string;
  public email: string;

  constructor(friendId: number, id: number, username: string, email: string) {
    this.friendId = friendId;
    this.id = id;
    this.username = username;
    this.email = email;
  }
}

export default FriendDto;
