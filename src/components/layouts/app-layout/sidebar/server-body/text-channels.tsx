import ChevronRight from '../../../../icons/xs/chevron-right.svg';
import ChevronDown from '../../../../icons/xs/chevron-down.svg';
import { useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';
import ChannelButton from './channel-button';
import CreateChannelButton from './create-channel-button';

const TextChannels = () => {
  const [showTextChannels, setShowTextChannels] = useState(false);

  const { textChannels } = useServer();

  const handleTextChannelButtonClick = () => {
    setShowTextChannels((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <button
          onClick={handleTextChannelButtonClick}
          className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase text-slate-300 hover:text-white"
        >
          {showTextChannels ? <ChevronDown /> : <ChevronRight />}
          <span>Text channels</span>
        </button>
        <CreateChannelButton />
      </div>
      {showTextChannels && (
        <div className="w-full space-y-1 p-2">
          {textChannels.map((channel) => {
            return <ChannelButton key={channel.id} channel={channel} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TextChannels;
