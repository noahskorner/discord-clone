import { useContext } from 'react';
import { ServersContext } from '../contexts/servers-context';

const useServers = () => {
  return useContext(ServersContext);
};

export default useServers;
