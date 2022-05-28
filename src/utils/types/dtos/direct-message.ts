import DirectMessage from '../../../server/db/models/direct-message.model';
import DirectMessageUserDto from './direct-message-user';

class DirectMessageDto {
  id: number;
  users: DirectMessageUserDto[];

  constructor(directMessage: DirectMessage) {
    this.id = directMessage.id;
    this.users =
      directMessage.users == null
        ? []
        : directMessage.users.map((dmu) => new DirectMessageUserDto(dmu));
  }
}

export default DirectMessageDto;
