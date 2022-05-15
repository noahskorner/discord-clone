import ChannelType from '../../../../../utils/enums/channel-type';
import { ChannelIcon, IconSize } from '../../../../icons';

interface WelcomeTextProps {
  channelName: string;
  channelType: ChannelType;
}

const WelcomeText = ({ channelName, channelType }: WelcomeTextProps) => {
  return (
    <span className="w-full space-y-4">
      <span className="inline-flex items-center justify-center rounded-full bg-slate-500 p-2">
        <ChannelIcon channelType={channelType} size={IconSize['6xl']} />
      </span>
      <h1 className="text-3xl font-extrabold">Welcome to #{channelName}!</h1>
      <p className="text-sm text-slate-300">
        This is the start of the #{channelName} channel.
      </p>
    </span>
  );
};

export default WelcomeText;
