import { createContext, useCallback, useEffect, useRef } from 'react';
import stunConfig from '../../config/stun.config';
import EventEnum from '../enums/events';
import useSocket from '../hooks/use-socket';

interface RTCContextInterface {
  startCall: () => Promise<void>;
  localStream: null | MediaStream;
  remoteStream: null | MediaStream;
}

const defaultValues = {
  startCall: async () => {},
  localStream: null,
  remoteStream: null,
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
  const localStreamRef = useRef<null | MediaStream>(null);
  const remoteStreamRef = useRef<null | MediaStream>(null);

  const { socket } = useSocket();

  const initPeerConnection = useCallback(async () => {
    const peerConnection = new RTCPeerConnection(stunConfig);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = stream;
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
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
    peerConnection.addEventListener('track', (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current?.addTrack(track);
      });
    });

    return peerConnection;
  }, [socket]);

  const receiveOfferHandler = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      peerConnectionRef.current = await initPeerConnection();
      await peerConnectionRef.current.setRemoteDescription(offer);

      const answer = await peerConnectionRef.current.createAnswer(RTC_OPTIONS);
      await peerConnectionRef.current.setLocalDescription(answer);

      socket?.current.emit(EventEnum.SEND_ANSWER, answer);
    },
    [initPeerConnection, socket],
  );

  const receiveAnswerHandler = async (answer: RTCSessionDescription) => {
    const remoteDesc = new RTCSessionDescription(answer);
    await peerConnectionRef.current?.setRemoteDescription(remoteDesc);
  };

  const receiveCandidateHandler = async (candidate: RTCIceCandidate) => {
    await peerConnectionRef.current?.addIceCandidate(candidate);
  };

  useEffect(() => {
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
  }, [initPeerConnection, receiveOfferHandler, socket]);

  const startCall = async () => {
    peerConnectionRef.current = await initPeerConnection();
    const offer = await peerConnectionRef.current.createOffer(RTC_OPTIONS);
    await peerConnectionRef.current.setLocalDescription(offer);

    // kick everything off
    socket?.current.emit(EventEnum.SEND_OFFER, offer);
  };

  return (
    <RTCContext.Provider
      value={{
        localStream: localStreamRef.current,
        remoteStream: remoteStreamRef.current,
        startCall,
      }}
    >
      {children}
    </RTCContext.Provider>
  );
};
