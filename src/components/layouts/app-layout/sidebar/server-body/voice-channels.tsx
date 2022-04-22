import Tooltip from '../../../../feedback/tooltip';
import PlusIcon from '../../../../icons/sm/plus.svg';
import ChevronRight from '../../../../icons/xs/chevron-right.svg';
import ChevronDown from '../../../../icons/xs/chevron-down.svg';
import VolumeUpIcon from '../../../../icons/volume-up.svg';
import { useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';

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
        <Tooltip text="Create Channel" direction="top" size="sm">
          <button className="text-slate-300 hover:text-white">
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
      {showVoiceChannels && (
        <div className="w-full space-y-1 p-2">
          {voiceChannels.map((channel) => {
            return (
              <button
                key={channel.id}
                className="flex w-full items-center rounded-md px-2 py-[0.35rem] text-sm hover:bg-slate-600"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-slate-300">
                    <VolumeUpIcon />
                  </span>
                  <span>{channel.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VoiceChannels;
