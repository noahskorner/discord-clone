import useApp from '../../../../utils/hooks/use-app';
import useChannel from '../../../../utils/hooks/use-channel';
import { BarsIcon, ChannelIcon, IconSize } from '../../../icons';

const Header = () => {
  const { setShowSidebar } = useApp();
  const { channel } = useChannel();

  const handleSidebarBtnClick = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <header className="flex h-header w-full items-center space-x-2 p-2 shadow-header">
      <button
        onClick={handleSidebarBtnClick}
        className="flex items-center justify-center rounded-md p-1 hover:bg-slate-800 md:hidden"
      >
        <BarsIcon size={IconSize.lg} />
      </button>
      {channel && (
        <div className="flex items-center space-x-1 text-slate-300">
          <ChannelIcon channelType={channel.type} size={IconSize.lg} />
          <p className="font-bold text-white">{channel.name}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
