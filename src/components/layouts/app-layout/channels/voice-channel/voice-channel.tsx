import { useEffect, useRef } from 'react';
import useRTC from '../../../../../utils/hooks/use-rtc';

const VoiceChannel = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream, startCall } = useRTC();

  useEffect(() => {
    if (localVideoRef.current == null) return;
    localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current == null) return;
    remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4">
      <button
        onClick={startCall}
        className="rounded-md bg-indigo-800 px-4 py-2"
      >
        Start call
      </button>
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="h-96 w-full bg-black">
          <video
            className="h-full w-full object-fill"
            ref={localVideoRef}
            muted
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="h-96 w-full bg-black">
          <video
            className="h-full w-full object-fill"
            ref={remoteVideoRef}
            muted
            autoPlay
            playsInline
          ></video>
        </div>
      </div>
    </div>
  );
};

export default VoiceChannel;
