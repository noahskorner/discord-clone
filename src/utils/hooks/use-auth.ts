import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
