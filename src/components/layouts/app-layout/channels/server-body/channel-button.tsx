import { useRouter } from 'next/router';
import ChannelType from '../../../../../utils/enums/channel-type';
import useApp from '../../../../../utils/hooks/use-app';
import useChannel from '../../../../../utils/hooks/use-channel';
import ChannelDto from '../../../../../utils/types/dtos/channel';
import { IconSize, PoundIcon, VolumeUpIcon } from '../../../../icons';

interface ChannelButtonProps {
  channel: ChannelDto;
}

const ChannelButton = ({ channel }: ChannelButtonProps) => {
  const { setShowSidebar } = useApp();
  const router = useRouter();
  const { serverId } = router.query as { serverId: string };
  const { channel: currentChannel } = useChannel();

  const handleChannelBtnClick = async (channelId: number) => {
    router.push(`/servers/${serverId}/channels/${channelId}`);
    setShowSidebar(false);
  };

  return (
    <button
      onClick={() => handleChannelBtnClick(channel.id)}
      className={`${
        currentChannel != null && currentChannel.id === channel.id
          ? 'bg-slate-600 font-semibold text-white'
          : 'hover:bg-slate-600/20 hover:font-medium hover:text-white'
      } flex w-full items-center rounded px-2 py-[0.35rem] text-sm font-medium text-slate-300`}
    >
      <div className="flex items-center space-x-1">
        <span className="text-slate-300">
          {channel.type === ChannelType.TEXT ? (
            <PoundIcon size={IconSize.sm} />
          ) : (
            <VolumeUpIcon size={IconSize.sm} />
          )}
        </span>
        <span>{channel.name}</span>
      </div>
    </button>
  );
};

export default ChannelButton;
