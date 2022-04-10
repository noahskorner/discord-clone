import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import ErrorInterface from '../../utils/types/interfaces/error';
import LoginRequest from '../../utils/types/requests/auth/login';

const AuthValidator = {
  login: ({ email, password }: LoginRequest) => {
    let errors: ErrorInterface[] = [];

    if (!isEmail(email))
      errors.push({ field: 'email', message: 'Must provide a valid email.' });
    if (password == null || !isLength(password, { min: 8 }))
      errors.push({ field: 'password', message: 'Must provide a password.' });

    return errors;
  },
};

export default AuthValidator;
