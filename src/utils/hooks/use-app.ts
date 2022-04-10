import { useContext } from 'react';
import { AppContext } from '../contexts/app-context';

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
