import DirectMessage from '../../../server/db/models/direct-message.model';
import DirectMessageUserDto from './direct-message-user';

export const getLabel = (
  currentUserId: number,
  directMessage: DirectMessageDto,
) => {
  return directMessage?.users != null && directMessage.users.length > 0
    ? directMessage.users.length === 1
      ? directMessage.users[0].username
      : directMessage.users
          .filter((e) => e.userId !== currentUserId)
          .reduce((a, b, index) => {
            return index !==
              directMessage.users.filter((e) => e.userId !== currentUserId)
                .length -
                1
              ? a + `${b.username}, `
              : a + b.username;
          }, '')
    : [];
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
