import useApp from '../../../../utils/hooks/use-app';
import { BarsIcon, IconSize } from '../../../icons';

interface HeaderProps {
  children: JSX.Element;
}

const Header = ({ children }: HeaderProps) => {
  const { setShowSidebar } = useApp();

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
      {children}
    </header>
  );
};

export default Header;
