import isLength from 'validator/lib/isLength';
import MessageType from '../../../utils/enums/message-type';
import ErrorInterface from '../../../utils/types/interfaces/error';
import CreateMessageRequest from '../../../utils/types/requests/message/create-message';

const validateType = (
  type: MessageType,
  directMessageId?: number,
): ErrorInterface[] => {
  const errors: ErrorInterface[] = [];

  if (!(type in MessageType))
    errors.push({
      field: 'type',
      message: 'Must provide a messsage type.',
    });
  else if (
    (type === MessageType.DIRECT || type === MessageType.SERVER_INVITE) &&
    directMessageId == null
  ) {
    errors.push({
      field: 'type',
      message: 'Must provide a directMessageId',
    });
  }

  return errors;
};

const MessageValidator = {
  create: ({
    type,
    body,
    directMessageId,
  }: CreateMessageRequest): ErrorInterface[] => {
    const errors: ErrorInterface[] = validateType(type, directMessageId);

    if (!isLength(body, { min: 1, max: 250 })) {
      errors.push({
        field: 'body',
        message: 'Body must be between 1 and 250 characters.',
      });
    }

    return errors;
  },
};

export default MessageValidator;
