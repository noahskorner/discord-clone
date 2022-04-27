import { createContext, useEffect, useRef } from 'react';
import stunConfig from '../../config/stun.config';
import EventEnum from '../enums/events';
import useSocket from '../hooks/use-socket';

interface RTCContextInterface {}

const defaultValues = {};

export const RTCContext = createContext<RTCContextInterface>(defaultValues);

interface RTCProviderInterface {
  children: JSX.Element;
}

export const RTCProvider = ({ children }: RTCProviderInterface) => {
  const peerConnectionRef = useRef<null | RTCPeerConnection>(null);

  const { socket } = useSocket();

  useEffect(() => {
    const recieveOfferHandler = async (answer: RTCSessionDescriptionInit) => {
      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnectionRef.current?.setRemoteDescription(remoteDesc);

      peerConnectionRef.current?.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
          socket?.current.emit(EventEnum.SEND_ICE_CANDIDATE, event.candidate);
        }
      });
      peerConnectionRef.current?.addEventListener(
        'connectionstatechange',
        () => {
          if (peerConnectionRef.current?.connectionState === 'connected') {
            console.log('peers connected!');
          }
        },
      );
    };
    const recieveIceCandidateHandler = async (candidate: RTCIceCandidate) => {
      await peerConnectionRef.current?.addIceCandidate(candidate);
    };

    socket?.current.on(EventEnum.RECEIVE_OFFER, recieveOfferHandler);
    socket?.current.on(
      EventEnum.RECEIVE_ICE_CANDIDATE,
      recieveIceCandidateHandler,
    );

    () => {
      socket?.current.off(EventEnum.RECEIVE_OFFER, recieveOfferHandler);
      socket?.current.off(
        EventEnum.RECEIVE_ICE_CANDIDATE,
        recieveIceCandidateHandler,
      );
      peerConnectionRef.current?.close();
    };
  }, [socket]);

  useEffect(() => {
    const startCall = async () => {
      peerConnectionRef.current = new RTCPeerConnection(stunConfig);
      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnectionRef.current.setLocalDescription(offer);

      // kick everything off
      socket?.current.emit(EventEnum.SEND_OFFER, offer);
    };

    startCall();
  }, [socket]);

  return <RTCContext.Provider value={{}}>{children}</RTCContext.Provider>;
};
