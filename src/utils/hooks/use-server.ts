import { useContext } from 'react';
import { ServerContext } from '../contexts/server-context';

const useServer = () => {
  return useContext(ServerContext);
};

export default useServer;
