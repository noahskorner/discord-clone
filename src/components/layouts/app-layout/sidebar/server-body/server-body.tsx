import TextChannels from './text-channels';
import VoiceChannels from './voice-channels';

const ServerBody = () => {
  return (
    <div className="w-full space-y-4 px-2 py-4">
      <TextChannels />
      <VoiceChannels />
    </div>
  );
};

export default ServerBody;
