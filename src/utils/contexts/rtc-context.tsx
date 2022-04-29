import { createContext, useCallback, useEffect, useRef } from 'react';
import stunConfig from '../../config/stun.config';
import EventEnum from '../enums/events';
import useSocket from '../hooks/use-socket';

interface RTCContextInterface {
  startCall: () => Promise<void>;
}

const defaultValues = {
  startCall: async () => {},
};

export const RTCContext = createContext<RTCContextInterface>(defaultValues);

interface RTCProviderInterface {
  children: JSX.Element;
}

const RTC_OPTIONS = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};

export const RTCProvider = ({ children }: RTCProviderInterface) => {
  const peerConnectionRef = useRef<null | RTCPeerConnection>(null);

  const { socket } = useSocket();

  const initPeerConnection = useCallback(() => {
    const peerConnection = new RTCPeerConnection(stunConfig);
    peerConnection.addEventListener('icecandidate', (event) => {
      if (event.candidate) {
        socket?.current.emit(EventEnum.SEND_ICE_CANDIDATE, event.candidate);
      }
    });
    peerConnection.addEventListener('connectionstatechange', () => {
      if (peerConnection.connectionState === 'connected') {
        console.log('peers connected!');
      }
    });

    return peerConnection;
  }, [socket]);

  useEffect(() => {
    const receiveOfferHandler = async (offer: RTCSessionDescriptionInit) => {
      peerConnectionRef.current = initPeerConnection();
      peerConnectionRef.current.setRemoteDescription(offer);

      const answer = await peerConnectionRef.current.createAnswer(RTC_OPTIONS);
      await peerConnectionRef.current.setLocalDescription(answer);
    };
    const receiveAnswerHandler = async (answer: RTCSessionDescription) => {
      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnectionRef.current?.setRemoteDescription(remoteDesc);
    };
    const receiveCandidateHandler = async (candidate: RTCIceCandidate) => {
      await peerConnectionRef.current?.addIceCandidate(candidate);
    };

    socket?.current.on(EventEnum.RECEIVE_OFFER, receiveOfferHandler);
    socket?.current.on(EventEnum.RECEIVE_ANSWER, receiveAnswerHandler);
    socket?.current.on(
      EventEnum.RECEIVE_ICE_CANDIDATE,
      receiveCandidateHandler,
    );

    () => {
      socket?.current.off(EventEnum.RECEIVE_OFFER, receiveOfferHandler);
      socket?.current.off(EventEnum.RECEIVE_ANSWER, receiveAnswerHandler);
      socket?.current.off(
        EventEnum.RECEIVE_ICE_CANDIDATE,
        receiveCandidateHandler,
      );
    };
  }, [initPeerConnection, socket]);

  const startCall = async () => {
    peerConnectionRef.current = initPeerConnection();
    const offer = await peerConnectionRef.current.createOffer(RTC_OPTIONS);
    await peerConnectionRef.current.setLocalDescription(offer);

    // kick everything off
    socket?.current.emit(EventEnum.SEND_OFFER, offer);
  };
  return (
    <RTCContext.Provider value={{ startCall }}>{children}</RTCContext.Provider>
  );
};
