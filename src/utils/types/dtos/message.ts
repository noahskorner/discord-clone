import Message from '../../../server/db/models/message.model';
import MessageType from '../../enums/message-type';

class MessageSender {
  public userId: number;
  public email: string;
  public username: string;

  constructor(userId: number, email: string, username: string) {
    this.userId = userId;
    this.email = email;
    this.username = username;
  }
}

class MessageDto {
  public id: number;
  public type: MessageType;
  public sender: MessageSender;
  public body: string;
  public directMessageId?: number;

  constructor(message: Message) {
    this.id = message.id;
    this.type = message.type;
    this.sender = new MessageSender(
      message.sender.id ?? 0,
      message.sender.email ?? '',
      message.sender.username ?? '',
    );
    this.body = message.body;
    this.directMessageId = message.directMessageId;
  }
}

export default MessageDto;
