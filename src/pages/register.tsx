import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import UserValidator from '../server/validators/user.validator';
import UserService from '../services/user-service';
import useToasts from '../utils/hooks/use-toasts';
import handleServiceError from '../utils/services/handle-service-error';
import ErrorInterface from '../utils/types/interfaces/error';
import CreateUserRequest from '../utils/types/requests/user/create-user';

const RegisterPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailErrors = errors.filter((error) => error.field === 'email');
  const passwordErrors = errors.filter((error) => error.field === 'password');
  const confirmPasswordErrors = errors.filter(
    (error) => error.field === 'confirmPassword',
  );
  const router = useRouter();
  const { success } = useToasts();

  const registerUser = async () => {
    const payload = { email, password, confirmPassword } as CreateUserRequest;
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
      className="w-full h-full flex flex-col justify-center items-center p-6 bg-indigo-500 text-primary bg-login overflow-auto"
    >
      <div className="w-full max-w-lg bg-slate-700 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-8 bounce-in">
        <div className="flex flex-col space-y-4">
          <div className="space-y-1 w-full text-center">
            <h1 className="font-extrabold text-2xl">Create an account</h1>
          </div>
          <Errors errors={errors.filter((error) => error.field == null)} />
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
            className="bg-indigo-600 text-white text-sm font-semibold px-3 py-2 border border-indigo-600 rounded hover:bg-indigo-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0 w-0'}`}>Continue</span>
            {loading && <Spinner size="sm" />}
          </button>
          <Link href="/login">
            <a
              tabIndex={-1}
              className="hover:underline font-semibold text-sky-500 text-left text-xs"
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
