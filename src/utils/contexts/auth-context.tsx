import { createContext, useEffect, useState } from 'react';
import RequestUser from '../types/dtos/request-user';
import jwtDecode from 'jwt-decode';
import AuthService from '../../services/auth-service';
import JwtToken from '../types/interfaces/jwt-token';
import API from '../../services/api';
import handleServiceError from '../services/handle-service-error';
import useToasts from '../hooks/use-toasts';
import { useRouter } from 'next/router';

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: RequestUser | null;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  setAuth: (accessToken: string) => void;
  refreshAccessToken: () => void;
  logout: () => Promise<void>;
}

const defaultValues = {
  isAuthenticated: false,
  user: null,
  loading: true,
  setAuth: () => {},
  refreshAccessToken: () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValues.isAuthenticated,
  );
  const [user, setUser] = useState<RequestUser | null>(defaultValues.user);
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const { success, danger } = useToasts();
  const router = useRouter();

  const setAuth = (accessToken: string) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const { exp, ...rest } = jwtDecode<JwtToken>(accessToken);
    const requestUser = rest as RequestUser;

    setAccessToken(accessToken);
    silentRefresh(exp);
    setUser(requestUser);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await AuthService.refreshToken();
      setAuth(response.data);
    } catch {
      // refresh token is expired
      setLoading(false);
    }
  };

  const silentRefresh = (exp: number) => {
    const ms = Math.abs(new Date().getTime() - new Date(exp * 1000).getTime());
    setTimeout(() => {
      refreshAccessToken();
    }, ms);
  };

  const logout = async () => {
    try {
      await AuthService.logout();

      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
      success('Successfully logged out!', 'See you next time champ');
      router.push('/login');
    } catch (error) {
      const { errors } = handleServiceError(error);
      if (errors.length > 0) {
        errors.forEach((error) => {
          danger(error.message);
        });
      }
    }
  };

  useEffect(() => {
    if (!loading && accessToken == null) {
      delete API.defaults.headers.common['Authorization'];
    }
  }, [accessToken, loading]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        setAuth,
        refreshAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
