import isLength from 'validator/lib/isLength';
import ChannelType from '../../../../utils/enums/channel-type';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateChannelRequest from '../../../../utils/types/requests/server/channel/create-channel';

const ERROR_MUST_PROVIDE_TYPE: ErrorInterface = {
  field: 'type',
  message: 'Must provide a channel type.',
};
const ERROR_INVALID_TYPE: ErrorInterface = {
  field: 'type',
  message: 'Must provide a valid channel type.',
};
const ERROR_MUST_PROVIDE_NAME: ErrorInterface = {
  field: 'name',
  message: 'Must provide a channel name.',
};
const ERROR_INVALID_NAME: ErrorInterface = {
  field: 'name',
  message: 'Name must be at least 4 characters.',
};

const ChannelValidator = {
  create: ({ type, name }: CreateChannelRequest): ErrorInterface[] => {
    const errors = [];
    if (type == null) errors.push(ERROR_MUST_PROVIDE_TYPE);
    else if (!Object.values(ChannelType).includes(type))
      errors.push(ERROR_INVALID_TYPE);

    if (name == null) errors.push(ERROR_MUST_PROVIDE_NAME);
    else if (!isLength(name, { min: 4 })) errors.push(ERROR_INVALID_NAME);

    return errors;
  },
};

export default ChannelValidator;
