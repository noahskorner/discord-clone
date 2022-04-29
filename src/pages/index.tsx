import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import AppLayout from '../components/layouts/app-layout';
import useRTC from '../utils/hooks/use-rtc';

const IndexContent = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream, startCall } = useRTC();

  useEffect(() => {
    if (localVideoRef.current == null) return;
    localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    console.log(remoteStream);
    if (remoteVideoRef.current == null) return;
    remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  return (
    <div>
      <button onClick={startCall}>Start call</button>
      <video ref={localVideoRef} muted autoPlay playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
    </div>
  );
};

const IndexPage: NextPage = () => {
  return (
    <AppLayout>
      <IndexContent />
    </AppLayout>
  );
};

export default IndexPage;
