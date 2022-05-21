import { useContext } from 'react';
import { HomeContext } from '../contexts/home-context';

const useHome = () => {
  return useContext(HomeContext);
};

export default useHome;
