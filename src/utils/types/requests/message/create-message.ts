import MessageType from '../../../enums/message-type';

interface CreateMessageRequest {
  type: MessageType;
  body: string;
  directMessageId?: number;
}

export default CreateMessageRequest;
