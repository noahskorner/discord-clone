import ChannelType from '../../utils/enums/channel-type';
import { IconProps } from './icon';
import PoundIcon from './pound';
import VolumeUpIcon from './volume-up';

interface ChannelIconProps extends IconProps {
  channelType: ChannelType;
}

const ChannelIcon = ({ channelType, ...props }: ChannelIconProps) => {
  return channelType === ChannelType.TEXT ? (
    <PoundIcon {...props} />
  ) : channelType === ChannelType.VOICE ? (
    <VolumeUpIcon {...props} />
  ) : (
    <></>
  );
};

export default ChannelIcon;
