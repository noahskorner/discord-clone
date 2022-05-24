import { Dispatch, SetStateAction } from 'react';
import ChannelType from '../../../../../utils/enums/channel-type';
import { PoundIcon, VolumeUpIcon } from '../../../../icons';

interface ChannelTypeButtonsProps {
  channelType: ChannelType;
  setChannelType: Dispatch<SetStateAction<ChannelType>>;
}

const ChannelTypeButtons = ({
  channelType,
  setChannelType,
}: ChannelTypeButtonsProps) => {
  const handleTextBtnClick = () => {
    setChannelType(ChannelType.TEXT);
  };
  const handleVoiceBtnClick = () => {
    setChannelType(ChannelType.VOICE);
  };
  return (
    <>
      <button
        onClick={handleTextBtnClick}
        className={`${
          channelType === ChannelType.TEXT
            ? 'bg-slate-600'
            : 'bg-slate-1000 hover:bg-slate-700'
        } flex w-full items-center justify-start space-x-2 rounded-md p-3 shadow`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white">
          {channelType === ChannelType.TEXT && (
            <span className="h-2 w-2 rounded-full bg-white"></span>
          )}
        </span>
        <span className="text-slate-300">
          <PoundIcon />
        </span>
        <div className="flex flex-col items-start justify-start">
          <h6 className="text-sm">Text Channel</h6>
          <p className="text-xs text-slate-300">
            Post images, GIFs, stickers, opinions, and puns
          </p>
        </div>
      </button>
      <button
        onClick={handleVoiceBtnClick}
        className={`${
          channelType === ChannelType.VOICE
            ? 'bg-slate-600'
            : 'bg-slate-1000 hover:bg-slate-700'
        } flex w-full items-center justify-start space-x-2 rounded-md p-3 shadow`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white">
          {channelType === ChannelType.VOICE && (
            <span className="h-2 w-2 rounded-full bg-white"></span>
          )}
        </span>
        <span className="text-slate-300">
          <VolumeUpIcon />
        </span>
        <div className="flex flex-col items-start justify-start">
          <h6 className="text-sm">Voice Channel</h6>
          <p className="text-xs text-slate-300">
            Hang out with voice, video, and screen sharing
          </p>
        </div>
      </button>
    </>
  );
};

export default ChannelTypeButtons;
