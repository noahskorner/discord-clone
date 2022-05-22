import { createContext, useEffect, useState } from 'react';
import UserService from '../../services/user-service';
import useAuth from '../hooks/use-auth';
import useToasts from '../hooks/use-toasts';
import handleServiceError from '../services/handle-service-error';
import FriendDto from '../types/dtos/friend';
import UserDto from '../types/dtos/user';

interface UserContextInterface {
  loading: boolean;
  user: UserDto | null;
  // eslint-disable-next-line no-unused-vars
  addFriend: (friend: FriendDto) => void;
}

const defaultValues = {
  loading: false,
  user: null,
  addFriend: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultValues);

interface UserProviderInterface {
  children: JSX.Element;
}

export const UserProvder = ({ children }: UserProviderInterface) => {
  const { user: requestUser, loading: loadingAuth } = useAuth();
  const { danger } = useToasts();
  const [user, setUser] = useState<UserDto | null>(defaultValues.user);
  const [loading, setLoading] = useState(false);

  const addFriend = (friend: FriendDto) => {
    console.log(friend);

    setUser((prev) => {
      console.log(prev?.friends);

      return prev === null
        ? prev
        : {
            ...prev,
            friends: [...prev.friends, friend],
          };
    });
  };

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
    <UserContext.Provider value={{ user, loading, addFriend }}>
      {children}
    </UserContext.Provider>
  );
};
