import ChevronRight from '../../../../icons/xs/chevron-right.svg';
import ChevronDown from '../../../../icons/xs/chevron-down.svg';
import { useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';
import ChannelButton from './channel-button';
import CreateChannelButton from './create-channel-button';

const VoiceChannels = () => {
  const [showVoiceChannels, setShowVoiceChannels] = useState(false);
  const { voiceChannels } = useServer();

  const handleVoiceChannelButtonClick = () => {
    setShowVoiceChannels((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <button
          onClick={handleVoiceChannelButtonClick}
          className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase text-slate-300 hover:text-white"
        >
          {showVoiceChannels ? <ChevronDown /> : <ChevronRight />}
          <span>Voice channels</span>
        </button>
        <CreateChannelButton />
      </div>
      {showVoiceChannels && (
        <div className="w-full space-y-1 py-2 px-1">
          {voiceChannels.map((channel) => {
            return <ChannelButton key={channel.id} channel={channel} />;
          })}
        </div>
      )}
    </div>
  );
};

export default VoiceChannels;
