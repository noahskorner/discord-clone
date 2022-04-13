import isLength from 'validator/lib/isLength';
import ErrorInterface from '../../utils/types/interfaces/error';
import CreateServerRequest from '../../utils/types/requests/server/create-server';

const ERROR_MUST_PROVIDE_SEVER_NAME = {
  field: 'name',
  message: 'Must provide a server name.',
};

const ERROR_INVALID_SEVER_NAME = {
  field: 'name',
  message: 'Server name must be between 4 and 25 characters.',
};

const ServerValidator = {
  create: ({ name }: CreateServerRequest) => {
    const errors: ErrorInterface[] = [];

    if (name == null) {
      errors.push(ERROR_MUST_PROVIDE_SEVER_NAME);
    } else if (!isLength(name, { min: 4, max: 25 })) {
      errors.push(ERROR_INVALID_SEVER_NAME);
    }

    return errors;
  },
};

export default ServerValidator;
