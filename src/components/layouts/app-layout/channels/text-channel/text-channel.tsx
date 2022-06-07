import useChannel from '../../../../../utils/hooks/use-channel';
import WelcomeText from '../welcome-text';
import ChannelTextArea from './channel-text-area';

const TextChannel = () => {
  const { channel } = useChannel();

  return (
    <div className="relative z-0 flex h-full max-h-full w-full flex-col justify-between pr-1">
      <div className="flex h-full w-full flex-col-reverse overflow-y-scroll p-4">
        <WelcomeText
          channelName={channel?.name!}
          channelType={channel?.type!}
        />
      </div>
      <ChannelTextArea
        value=""
        onInput={() => {}}
        onKeyDown={() => {}}
        placeholder={`Message #${channel?.name}`}
      />
    </div>
  );
};

export default TextChannel;
