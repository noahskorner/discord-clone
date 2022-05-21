import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateFriendRequest from '../../../../utils/types/requests/user/friend/create-friend';

const FriendValidator = {
  create: ({ addresseeEmail }: CreateFriendRequest): ErrorInterface[] => {
    const errors: ErrorInterface[] = [];

    return errors;
  },
};

export default FriendValidator;
