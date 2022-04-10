import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';
import Errors from '../../../components/inputs/errors';
import Spinner from '../../../components/inputs/spinner';
import TextField from '../../../components/inputs/text-field';
import UserValidator from '../../../server/validators/user.validator';
import UserService from '../../../services/user-service';
import handleServiceError from '../../../utils/services/handle-service-error';
import ErrorInterface from '../../../utils/types/interfaces/error';
import ConfirmResetPasswordRequest from '../../../utils/types/requests/user/confirm-reset-password';

const ConfirmPasswordPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordErrors = errors.filter((error) => error.field === 'password');
  const confirmPasswordErrors = errors.filter(
    (error) => error.field === 'confirmPassword',
  );
  const router = useRouter();
  const { token } = router.query as { token?: string };

  const confirmResetPassword = async () => {
    if (token == null) return;

    const payload = {
      password,
      confirmPassword,
    } as ConfirmResetPasswordRequest;
    const errors = UserValidator.confirmResetPassword(payload);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await UserService.confirmResetPassword(token, payload);
      console.log(response);
      router.push('/login');
    } catch (error) {
      const { errors } = handleServiceError(error);
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') confirmResetPassword();
  };

  const handleOnInputPassword = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'password'));
    setPassword(value);
  };

  const handleOnInputConfirmPassword = (value: string) => {
    setErrors((prev) =>
      prev.filter((error) => error.field !== 'confirmPassword'),
    );
    setConfirmPassword(value);
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
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            type="password"
            color="secondary"
            errors={passwordErrors}
          />
          <TextField
            value={confirmPassword}
            onInput={handleOnInputConfirmPassword}
            label="Confirm password"
            type="password"
            color="secondary"
            errors={confirmPasswordErrors}
          />
          <button
            onClick={confirmResetPassword}
            disabled={loading}
            className="bg-indigo-600 text-white text-sm font-semibold px-3 py-2 border border-indigo-600 rounded hover:bg-indigo-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0 w-0'}`}>
              Update password
            </span>
            {loading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordPage;
