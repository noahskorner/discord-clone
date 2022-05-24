import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateDirectMessageRequest from '../../../../utils/types/requests/user/direct-message/create-direct-message';

const DirectMessageValidator = {
  create: ({ friendIds }: CreateDirectMessageRequest) => {
    const errors: ErrorInterface[] = [];

    if (friendIds == null)
      errors.push({
        field: 'friendIds',
        message: 'Must provide a list of friendIds.',
      });
    else if (friendIds.length < 1)
      errors.push({
        field: 'friendIds',
        message: 'Must provide at least one friendId.',
      });

    return errors;
  },
};

export default DirectMessageValidator;
