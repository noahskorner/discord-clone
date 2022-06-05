import { useContext } from 'react';
import { DirectMessageContext } from '../contexts/direct-message-context';

const useDirectMessage = () => {
  return { ...useContext(DirectMessageContext) };
};

export default useDirectMessage;
