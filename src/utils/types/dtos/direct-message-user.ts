import DirectMessageUser from '../../../server/db/models/direct-message-user.model';

class DirectMessageUserDto {
  public userId: number;
  public email: string;
  public username: string;

  constructor(directMessageUser: DirectMessageUser) {
    this.userId = directMessageUser.userId;
    this.email =
      directMessageUser.user != null ? directMessageUser.user.email : '';
    this.username =
      directMessageUser.user != null ? directMessageUser.user.username : '';
  }
}

export default DirectMessageUserDto;
