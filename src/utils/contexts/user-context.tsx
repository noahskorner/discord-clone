import { createContext, useEffect, useState } from 'react';
import UserService from '../../services/user-service';
import useAuth from '../hooks/use-auth';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import UserDTO from '../types/dtos/user';

interface UserContextInterface {
  loading: boolean;
  user: UserDTO | null;
}

const defaultValues = {
  loading: false,
  user: null,
};

export const UserContext = createContext<UserContextInterface>(defaultValues);

interface UserProviderInterface {
  children: JSX.Element;
}

export const UserProvder = ({ children }: UserProviderInterface) => {
  const { user: requestUser, loading: loadingAuth } = useAuth();
  const { danger } = useToasts();
  const [user, setUser] = useState<UserDTO | null>(defaultValues.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loadingAuth || requestUser == null) return;

    const loadUser = async (userId: number) => {
      setLoading(true);
      try {
        const { data } = await UserService.get(userId);
        setUser(data);
      } catch (error) {
        const { errors } = handleServiceError(error);
        errors.forEach((error) => {
          danger(error.message);
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser(requestUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAuth, requestUser]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
