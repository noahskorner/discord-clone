import { useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';
import ChannelButton from './channel-button';
import CreateChannelButton from './create-channel-button';
import { ChevronDownIcon, ChevronRightIcon, IconSize } from '../../../../icons';

const TextChannels = () => {
  const [showTextChannels, setShowTextChannels] = useState(false);

  const { textChannels } = useServer();

  const handleTextChannelBtnClick = () => {
    setShowTextChannels((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <button
          onClick={handleTextChannelBtnClick}
          className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase text-slate-300 hover:text-white"
        >
          {showTextChannels ? (
            <ChevronDownIcon size={IconSize.xs} />
          ) : (
            <ChevronRightIcon size={IconSize.xs} />
          )}
          <span>Text channels</span>
        </button>
        <CreateChannelButton />
      </div>
      {showTextChannels && (
        <div className="w-full space-y-[3px] py-2 px-1">
          {textChannels.map((channel) => {
            return <ChannelButton key={channel.id} channel={channel} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TextChannels;
