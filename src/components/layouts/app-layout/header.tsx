import useApp from '../../../utils/hooks/use-app';
import useChannel from '../../../utils/hooks/use-channel';
import { BarsIcon, IconSize } from '../../icons';

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
      {channel && <p className="font-bold">{channel.name}</p>}
    </header>
  );
};

export default Header;
