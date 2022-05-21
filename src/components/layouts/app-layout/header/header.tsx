import useApp from '../../../../utils/hooks/use-app';
import useChannel from '../../../../utils/hooks/use-channel';
import { BarsIcon, ChannelIcon, FriendIcon, IconSize } from '../../../icons';

const Header = () => {
  const { setShowSidebar } = useApp();
  const { channel } = useChannel();

  const handleSidebarBtnClick = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <header className="flex h-header w-full shrink-0 items-center space-x-2 p-2 shadow-header">
      <button
        onClick={handleSidebarBtnClick}
        className="flex items-center justify-center rounded-md p-1 hover:bg-slate-800 md:hidden"
      >
        <BarsIcon size={IconSize.lg} />
      </button>
      {channel ? (
        <div className="flex items-center space-x-1 text-slate-300">
          <ChannelIcon channelType={channel.type} size={IconSize.lg} />
          <p className="font-bold text-white">{channel.name}</p>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-start">
          <span className="flex items-center space-x-4">
            <FriendIcon className="text-slate-300" size={IconSize.lg} />
            <h6 className="mr-4 border-r border-slate-500 pr-4 text-sm font-semibold">
              Friends
            </h6>
          </span>
          <button className="p-4 text-sm font-medium text-slate-300">
            Online
          </button>
          <button className="p-4 text-sm font-medium text-slate-300">
            All
          </button>
          <button className="p-4 text-sm font-medium text-slate-300">
            Pending
          </button>
          <button className="flex items-center justify-center rounded-md bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-green-800">
            Add friend
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
