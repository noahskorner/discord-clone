import ErrorInterface from '../../../../utils/types/interfaces/error';

const InviteValidator = {
  create: ({ addresseeId }: { addresseeId: number }) => {
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
