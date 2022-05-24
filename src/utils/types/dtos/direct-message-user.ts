import DirectMessageUser from '../../../server/db/models/direct-message-user.model';

class DirectMessageUserDto {
  public directMessageUserId: number;
  public id: number;
  public email: string;
  public username: string;

  constructor(directMessageUser: DirectMessageUser) {
    this.directMessageUserId = directMessageUser.id;
    this.id = directMessageUser.userId;
    this.email = directMessageUser.user.email;
    this.username = directMessageUser.user.username;
  }
}

export default DirectMessageUserDto;
