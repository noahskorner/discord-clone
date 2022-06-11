import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateServerInviteRequest from '../../../../utils/types/requests/server/invite/create-server-invite';

const InviteValidator = {
  create: ({ friendId }: CreateServerInviteRequest) => {
    const validationErrors: ErrorInterface[] = [];
    if (friendId == null || isNaN(friendId))
      validationErrors.push({
        field: 'friendId',
        message: 'Must provide a valid friendId',
      });
    return validationErrors;
  },
};

export default InviteValidator;
