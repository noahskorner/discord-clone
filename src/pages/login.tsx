import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';
import Errors from '../components/inputs/errors';
import Spinner from '../components/inputs/spinner';
import TextField from '../components/inputs/text-field';
import AuthValidator from '../server/validators/auth.validator';
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
  const { setAuth } = useAuth();
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

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full h-full flex flex-col justify-center items-center p-6 bg-indigo-500 text-primary bg-login"
    >
      <div className="w-full max-w-lg bg-slate-700 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-8 bounce-in">
        <div className="flex flex-col space-y-4">
          <div className="space-y-1 w-full text-center">
            <h1 className="font-extrabold text-2xl">Welcome Back!</h1>
            <p className="text-slate-300 text-sm">
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
                className="text-xs hover:underline font-semibold text-sky-500 text-left"
              >
                Forgot Password?
              </a>
            </Link>
          </div>
          <button
            onClick={loginUser}
            disabled={loading}
            className="bg-indigo-600 text-white text-sm font-semibold px-3 py-2 border border-indigo-600 rounded hover:bg-indigo-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0 w-0'}`}>Login</span>
            {loading && <Spinner size="sm" />}
          </button>
          <p className="text-xs text-slate-500">
            Need an account? &nbsp;
            <Link href="/register">
              <a
                tabIndex={-1}
                className="hover:underline font-semibold text-sky-500 text-left"
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
