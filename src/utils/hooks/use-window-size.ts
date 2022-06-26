import { useContext } from 'react';
import { WindowContext } from '../contexts/window-context';

const useWindowSize = () => {
  return useContext(WindowContext);
};

export default useWindowSize;
