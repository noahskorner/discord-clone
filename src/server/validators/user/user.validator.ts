import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import ErrorInterface from '../../../utils/types/interfaces/error';
import ConfirmResetPasswordRequest from '../../../utils/types/requests/user/confirm-reset-password';
import CreateUserRequest from '../../../utils/types/requests/user/create-user';
import ResetPasswordRequest from '../../../utils/types/requests/user/reset-password';

const ERROR_INVALID_USERNAME = {
  field: 'username',
  message: 'Username must be at least 4 characters.',
};

const ERROR_USERNAME_NOT_PROVIDED = {
  field: 'username',
  message: 'Must provide a username.',
};

const ERROR_INVALID_EMAIL = {
  field: 'email',
  message: 'Must provide a valid email.',
};

const UserValidator = {
  register: ({
    username,
    email,
    password,
    confirmPassword,
  }: CreateUserRequest): ErrorInterface[] => {
    const errors: ErrorInterface[] = [];

    if (username == null) errors.push(ERROR_USERNAME_NOT_PROVIDED);
    else if (!isLength(username, { min: 4 }))
      errors.push(ERROR_INVALID_USERNAME);

    if (email == null || !isEmail(email)) errors.push(ERROR_INVALID_EMAIL);

    if (password == null)
      errors.push({ field: 'password', message: 'Must provide a password.' });
    else if (!isLength(password, { min: 8 }))
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters.',
      });

    if (confirmPassword == null)
      errors.push({
        field: 'confirmPassword',
        message: 'Must confirm password.',
      });
    else if (password !== confirmPassword)
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.',
      });

    return errors;
  },
  resetPassword: ({ email }: ResetPasswordRequest): ErrorInterface[] => {
    return isEmail(email) ? [] : [ERROR_INVALID_EMAIL];
  },
  confirmResetPassword: ({
    password,
    confirmPassword,
  }: ConfirmResetPasswordRequest): ErrorInterface[] => {
    const errors: ErrorInterface[] = [];

    if (password == null)
      errors.push({ field: 'password', message: 'Must provide a password.' });
    if (!isLength(password, { min: 8 }))
      errors.push({
        field: 'password',
        message: 'Password must be at least 8 characters.',
      });
    if (confirmPassword == null)
      errors.push({
        field: 'confirmPassword',
        message: 'Must confirm password.',
      });
    if (password !== confirmPassword)
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.',
      });

    return errors;
  },
};

export default UserValidator;
