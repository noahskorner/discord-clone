import { NextPage } from 'next';
import Link from 'next/link';
import { KeyboardEvent, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import UserValidator from '../server/validators/user.validator';
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
      className="w-full h-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-6">
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
              className="text-sm hover:underline font-semibold text-indigo-500 text-left"
            >
              Remembered your password?
            </a>
          </Link>
          <button
            onClick={resetPassword}
            disabled={loading}
            className="bg-indigo-600 text-white text-sm font-semibold px-3 py-2 border border-indigo-600 rounded hover:bg-indigo-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0 w-0'}`}>
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
