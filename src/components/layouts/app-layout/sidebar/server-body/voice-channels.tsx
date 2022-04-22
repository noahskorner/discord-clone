import Tooltip from '../../../../feedback/tooltip';
import PlusIcon from '../../../../icons/sm/plus.svg';
import ChevronRight from '../../../../icons/xs/chevron-right.svg';
import ChevronDown from '../../../../icons/xs/chevron-down.svg';
import { useState } from 'react';

const VoiceChannels = () => {
  const [showVoiceChannels, setShowVoiceChannels] = useState(false);

  const handleVoiceChannelButtonClick = () => {
    setShowVoiceChannels((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handleVoiceChannelButtonClick}
        className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase text-slate-300 hover:text-white"
      >
        {showVoiceChannels ? <ChevronDown /> : <ChevronRight />}
        <span>Voice channels</span>
      </button>
      <Tooltip text="Create Channel" direction="top" size="sm">
        <button className="text-slate-300 hover:text-white">
          <PlusIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default VoiceChannels;
