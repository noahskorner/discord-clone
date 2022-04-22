import Tooltip from '../../../../feedback/tooltip';
import PlusIcon from '../../../../icons/sm/plus.svg';
import ChevronRight from '../../../../icons/xs/chevron-right.svg';
import ChevronDown from '../../../../icons/xs/chevron-down.svg';
import PoundIcon from '../../../../icons/pound.svg';
import { useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';
import Link from 'next/link';

const TextChannels = () => {
  const [showTextChannels, setShowTextChannels] = useState(false);
  const { server, textChannels } = useServer();

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
        <Tooltip text="Create Channel" direction="top" size="sm">
          <button className="text-slate-300 hover:text-white">
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
      {showTextChannels && (
        <div className="w-full space-y-1 p-2">
          {textChannels.map((channel) => {
            return (
              <Link
                href={`/server/${server?.id}/channel/${channel.id}`}
                key={channel.id}
                passHref
              >
                <a className="flex w-full items-center rounded-md px-2 py-[0.35rem] text-sm hover:bg-slate-600">
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-300">
                      <PoundIcon />
                    </span>
                    <span>{channel.name}</span>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TextChannels;
