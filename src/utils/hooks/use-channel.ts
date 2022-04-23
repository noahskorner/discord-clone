import { useContext } from 'react';
import { ChannelContext } from '../contexts/channel-context';

const useChannel = () => {
  return useContext(ChannelContext);
};

export default useChannel;
