import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserProvder } from '../../../utils/contexts/user-context';
import useAuth from '../../../utils/hooks/use-auth';

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const { loading, isAuthenticated, refreshAccessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    refreshAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <></>;
  } else {
    if (isAuthenticated) {
      return <UserProvder>{element}</UserProvder>;
    } else {
      router.push('/login');
      return <></>;
    }
  }
};

export default AuthRoute;
