import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
