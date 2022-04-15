import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import UserValidator from '../server/validators/user';
import UserService from '../services/user-service';
import useToasts from '../utils/hooks/use-toasts';
import handleServiceError from '../utils/services/handle-service-error';
import ErrorInterface from '../utils/types/interfaces/error';
import CreateUserRequest from '../utils/types/requests/user/create-user';

const RegisterPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const usernameErrors = errors.filter((error) => error.field === 'username');
  const emailErrors = errors.filter((error) => error.field === 'email');
  const passwordErrors = errors.filter((error) => error.field === 'password');
  const confirmPasswordErrors = errors.filter(
    (error) => error.field === 'confirmPassword',
  );
  const router = useRouter();
  const { success } = useToasts();

  const registerUser = async () => {
    const payload = {
      username,
      email,
      password,
      confirmPassword,
    } as CreateUserRequest;
    const errors = UserValidator.register(payload);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await UserService.create(payload);
      success(
        'Account successfully created!',
        'Check your inbox to verify your email.',
      );
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
    if (event.key === 'Enter') registerUser();
  };

  const handleOnInputUsername = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'username'));
    setUsername(value);
  };

  const handleOnInputEmail = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'email'));
    setEmail(value);
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
      className="text-primary bg-login flex h-full w-full flex-col items-center justify-center overflow-auto bg-indigo-500 sm:p-6"
    >
      <div className="border-primary bounce-in h-full w-full border bg-slate-700 p-6 shadow-md dark:border-0 dark:shadow-xl sm:h-auto sm:max-w-lg sm:rounded sm:p-8">
        <div className="flex flex-col space-y-4">
          <div className="w-full space-y-1 text-center">
            <h1 className="text-2xl font-extrabold">Create an account</h1>
          </div>
          <Errors errors={errors.filter((error) => error.field == null)} />
          <TextField
            value={username}
            onInput={handleOnInputUsername}
            label="Username"
            color="primary"
            errors={usernameErrors}
          />
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="primary"
            errors={emailErrors}
          />
          <TextField
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            type="password"
            color="primary"
            errors={passwordErrors}
          />
          <TextField
            value={confirmPassword}
            onInput={handleOnInputConfirmPassword}
            label="Confirm password"
            type="password"
            color="primary"
            errors={confirmPasswordErrors}
          />
          <button
            onClick={registerUser}
            disabled={loading}
            className="flex items-center justify-center space-x-1 rounded border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:ring-1"
          >
            <span className={`${loading && 'w-0 opacity-0'}`}>Continue</span>
            {loading && <Spinner size="sm" />}
          </button>
          <Link href="/login">
            <a
              tabIndex={-1}
              className="text-left text-xs font-semibold text-sky-500 hover:underline"
            >
              Already have an account?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
