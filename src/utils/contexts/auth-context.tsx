import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import RequestUser from '../types/dtos/request-user';
import jwtDecode from 'jwt-decode';
import AuthService from '../../services/auth-service';
import { useRouter } from 'next/router';
import JwtToken from '../types/interfaces/jwt-token';

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: RequestUser | null;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  setAuth: (accessToken: string) => void;
  refreshAccessToken: () => void;
}

const defaultValues = {
  isAuthenticated: false,
  user: null,
  loading: true,
  setAuth: () => {},
  refreshAccessToken: () => {},
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
  const router = useRouter();

  const setAuth = (accessToken: string) => {
    const { exp, ...rest } = jwtDecode<JwtToken>(accessToken);
    const requestUser = rest as RequestUser;

    setAccessToken(accessToken);
    silentRefresh(exp);
    setUser(requestUser);
    setIsAuthenticated(true);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await AuthService.refreshToken();
      setAuth(response.data);
    } catch {
      // refresh token is expired
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const silentRefresh = (exp: number) => {
    const ms = Math.abs(new Date().getTime() - new Date(exp * 1000).getTime());
    setTimeout(() => {
      refreshAccessToken();
    }, ms);
  };

  useEffect(() => {
    if (accessToken == null) {
      delete axios.defaults.headers.common['Authorization'];
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        setAuth,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
