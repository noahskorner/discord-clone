import ChannelType from '../../../../../utils/enums/channel-type';
import useChannel from '../../../../../utils/hooks/use-channel';
import ChannelDto from '../../../../../utils/types/dtos/channel';
import VolumeUpIcon from '../../../../icons/volume-up.svg';
import PoundIcon from '../../../../icons/pound.svg';

interface ChannelButtonProps {
  channel: ChannelDto;
}

const ChannelButton = ({ channel }: ChannelButtonProps) => {
  const { channel: currentChannel, loadChannel } = useChannel();

  const handleChannelButtonClick = async (channelId: number) => {
    await loadChannel(channelId);
  };

  return (
    <button
      onClick={() => handleChannelButtonClick(channel.id)}
      className={`${
        currentChannel != null && currentChannel.id === channel.id
          ? 'bg-slate-600'
          : 'hover:bg-slate-600'
      } flex w-full items-center rounded-md px-2 py-[0.35rem] text-sm`}
    >
      <div className="flex items-center space-x-1">
        <span className="text-slate-300">
          {channel.type === ChannelType.TEXT ? <PoundIcon /> : <VolumeUpIcon />}
        </span>
        <span>{channel.name}</span>
      </div>
    </button>
  );
};

export default ChannelButton;
