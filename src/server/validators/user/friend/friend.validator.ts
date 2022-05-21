import isEmail from 'validator/lib/isEmail';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateFriendRequest from '../../../../utils/types/requests/user/friend/create-friend';

const FriendValidator = {
  create: ({ addresseeEmail }: CreateFriendRequest): ErrorInterface[] => {
    const errors: ErrorInterface[] = [];

    if (addresseeEmail == null || !isEmail(addresseeEmail)) {
      errors.push({
        field: 'addresseeEmail',
        message: 'Must provide a valid addressee email.',
      });
    }

    return errors;
  },
};

export default FriendValidator;
