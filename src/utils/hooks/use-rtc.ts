import { useContext } from 'react';
import { RTCContext } from '../contexts/rtc-context';

const useRTC = () => {
  return useContext(RTCContext);
};

export default useRTC;
