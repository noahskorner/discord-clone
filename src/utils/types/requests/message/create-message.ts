import MessageType from '../../../enums/message-type';

interface CreateMessageRequest {
  type: MessageType;
  body: string;
  directMessageId?: number;
  serverInviteId?: number;
}

export default CreateMessageRequest;
