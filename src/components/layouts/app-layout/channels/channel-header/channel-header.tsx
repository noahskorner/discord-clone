import useChannel from '../../../../../utils/hooks/use-channel';
import { ChannelIcon, IconSize } from '../../../../icons';
import Header from '../../header';

const ChannelHeader = () => {
  const { channel } = useChannel();

  return (
    <Header>
      {channel == null ? (
        <></>
      ) : (
        <div className="flex items-center space-x-1 text-slate-300">
          <ChannelIcon channelType={channel.type} size={IconSize.lg} />
          <p className="font-bold text-white">{channel.name}</p>
        </div>
      )}
    </Header>
  );
};

export default ChannelHeader;
