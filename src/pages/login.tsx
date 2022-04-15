import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import AuthValidator from '../server/validators/auth';
import AuthService from '../services/auth-service';
import useAuth from '../utils/hooks/use-auth';
import handleServiceError from '../utils/services/handle-service-error';
import ErrorInterface from '../utils/types/interfaces/error';
import LoginRequest from '../utils/types/requests/auth/login';

const LoginPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailErrors = errors.filter((error) => error.field === 'email');
  const passwordErrors = errors.filter((error) => error.field === 'password');
  const {
    isAuthenticated,
    loading: loadingAuth,
    refreshAccessToken,
    setAuth,
  } = useAuth();
  const router = useRouter();

  const loginUser = async () => {
    const payload = { email, password } as LoginRequest;
    const errors = AuthValidator.login(payload);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login(payload);
      setAuth(response.data);
      router.push('/');
    } catch (error) {
      const { errors } = handleServiceError(error);
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') loginUser();
  };

  const handleOnInputEmail = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'email'));
    setEmail(value);
  };

  const handleOnInputPassword = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'password'));
    setPassword(value);
  };

  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAuth, isAuthenticated]);

  useEffect(() => {
    refreshAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="text-primary bg-login flex h-full w-full flex-col items-center  justify-center sm:p-6"
    >
      <div className="border-primary bounce-in h-full w-full rounded border bg-slate-700 p-6 shadow-md dark:border-0 dark:shadow-xl sm:h-auto sm:max-w-lg sm:p-8">
        <div className="flex flex-col space-y-4">
          <div className="w-full space-y-1 text-center">
            <h1 className="text-2xl font-extrabold">Welcome Back!</h1>
            <p className="text-sm text-slate-300">
              We&apos;re so excited to see you again!
            </p>
          </div>
          <Errors errors={errors.filter((error) => error.field == null)} />
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="primary"
            errors={emailErrors}
          />
          <div>
            <TextField
              value={password}
              onInput={handleOnInputPassword}
              label="Password"
              type="password"
              color="primary"
              errors={passwordErrors}
            />
            <Link href="/reset-password">
              <a
                tabIndex={-1}
                className="text-left text-xs font-semibold text-sky-500 hover:underline"
              >
                Forgot Password?
              </a>
            </Link>
          </div>
          <button
            onClick={loginUser}
            disabled={loading}
            className="flex items-center justify-center space-x-1 rounded border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:ring-1"
          >
            <span className={`${loading && 'w-0 opacity-0'}`}>Login</span>
            {loading && <Spinner size="sm" />}
          </button>
          <p className="text-xs text-slate-500">
            Need an account? &nbsp;
            <Link href="/register">
              <a
                tabIndex={-1}
                className="text-left font-semibold text-sky-500 hover:underline"
              >
                Register
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
