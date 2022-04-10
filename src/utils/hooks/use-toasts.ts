import { useContext } from 'react';
import { ToastContext } from '../contexts/toast-context';

const useToasts = () => {
  return useContext(ToastContext);
};

export default useToasts;
