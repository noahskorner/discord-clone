import { useContext } from 'react';
import { SocketContext } from '../contexts/socket-context';

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
