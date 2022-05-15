import useChannel from '../../../../../../utils/hooks/use-channel';

const ChannelTextArea = () => {
  const { channel } = useChannel();

  return (
    <div className="mb-4 flex w-full shrink-0 items-center justify-center px-4">
      <div className="h-11 w-full rounded-md bg-slate-channel-text-area px-4">
        <input
          type="text"
          className="h-full w-full bg-slate-channel-text-area text-sm"
          placeholder={`Message #${channel?.name}`}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default ChannelTextArea;
