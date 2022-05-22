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
  pendingFriendRequests: FriendDto[];
  numIncomingPendingFriendRequests: number;
  // eslint-disable-next-line no-unused-vars
  addFriendRequest: (friend: FriendDto) => void;
  // eslint-disable-next-line no-unused-vars
  replaceFriendRequest: (replacementFriend: FriendDto) => void;
}

const defaultValues = {
  loading: false,
  user: null,
  pendingFriendRequests: [],
  numIncomingPendingFriendRequests: 0,
  addFriendRequest: () => {},
  replaceFriendRequest: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultValues);

interface UserProviderInterface {
  children: JSX.Element;
}

export const UserProvder = ({ children }: UserProviderInterface) => {
  const { user: requestUser, loading: loadingAuth } = useAuth();
  const { danger } = useToasts();
  const [user, setUser] = useState<UserDto | null>(defaultValues.user);
  const pendingFriendRequests =
    user != null
      ? user.friendRequests
          .filter((f) => f.accepted === false)
          .sort(
            (a, b) =>
              new Date(a.requestedAt).getTime() -
              new Date(b.requestedAt).getTime(),
          )
      : [];
  const numIncomingPendingFriendRequests =
    user != null
      ? pendingFriendRequests.filter((f) => f.requester.id !== user.id).length
      : 0;
  const [loading, setLoading] = useState(false);

  const addFriendRequest = (friend: FriendDto) => {
    setUser((prev) => {
      return prev === null
        ? prev
        : {
            ...prev,
            friendRequests: [...prev.friendRequests, friend],
          };
    });
  };

  const replaceFriendRequest = (replacementFriend: FriendDto) => {
    setUser((prev) =>
      prev == null
        ? null
        : {
            ...prev,
            friendRequests: prev.friendRequests.map((friend) => {
              return friend.id === replacementFriend.id
                ? replacementFriend
                : friend;
            }),
          },
    );
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
    <UserContext.Provider
      value={{
        user,
        loading,
        pendingFriendRequests,
        numIncomingPendingFriendRequests,
        addFriendRequest,
        replaceFriendRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
