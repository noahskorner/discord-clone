import DirectMessage from '../../../server/db/models/direct-message.model';
import DirectMessageUserDto from './direct-message-user';

export const getLabel = (directMessage: DirectMessageDto) => {
  return directMessage.users.reduce((a, b, index) => {
    return index !== directMessage.users.length - 1
      ? a + `${b.username}, `
      : a + b.username;
  }, '');
};

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
