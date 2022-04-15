import { NextPage } from 'next';
import Link from 'next/link';
import { KeyboardEvent, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import UserValidator from '../server/validators/user';
import UserService from '../services/user-service';
import handleServiceError from '../utils/services/handle-service-error';
import ErrorInterface from '../utils/types/interfaces/error';
import ResetPasswordRequest from '../utils/types/requests/user/reset-password';

const ResetPasswordPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const [email, setEmail] = useState('');
  const emailErrors = errors.filter((error) => error.field === 'email');

  const resetPassword = async () => {
    const payload = { email } as ResetPasswordRequest;
    const errors = UserValidator.resetPassword(payload);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await UserService.resetPassword(payload);
    } catch (error) {
      const { errors } = handleServiceError(error);
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') resetPassword();
  };

  const handleOnInputEmail = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'email'));
    setEmail(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="text-primary flex h-full w-full flex-col items-center bg-gray-100 p-6 dark:bg-slate-900 sm:justify-center sm:pb-96"
    >
      <div className="border-primary w-full max-w-sm rounded border bg-white p-6 shadow-md dark:border-0 dark:bg-slate-800 dark:shadow-xl">
        <div className="flex flex-col space-y-4">
          <Errors errors={errors.filter((error) => error.field == null)} />
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <Link href="/login">
            <a
              tabIndex={-1}
              className="text-left text-sm font-semibold text-indigo-500 hover:underline"
            >
              Remembered your password?
            </a>
          </Link>
          <button
            onClick={resetPassword}
            disabled={loading}
            className="flex items-center justify-center space-x-1 rounded border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:ring-1"
          >
            <span className={`${loading && 'w-0 opacity-0'}`}>
              Reset password
            </span>
            {loading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
