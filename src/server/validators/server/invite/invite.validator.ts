import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateServerInviteRequest from '../../../../utils/types/requests/server/invite/create-server-invite';

const InviteValidator = {
  create: ({ addresseeId }: CreateServerInviteRequest) => {
    const validationErrors: ErrorInterface[] = [];
    if (addresseeId == null || isNaN(addresseeId))
      validationErrors.push({
        field: 'addresseeId',
        message: 'Must provide a valid addresseeId',
      });
    return validationErrors;
  },
};

export default InviteValidator;
