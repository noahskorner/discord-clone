import useApp from '../../../utils/hooks/use-app';
import BarsIcon from '../../icons/bars.svg';

const Header = () => {
  const { setShowSidebar } = useApp();

  const handleSidebarBtnClick = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <header className="flex h-header w-full items-center p-2 shadow-header">
      <button
        onClick={handleSidebarBtnClick}
        className="flex items-center justify-center rounded-md p-1 hover:bg-slate-800 md:hidden"
      >
        <BarsIcon />
      </button>
    </header>
  );
};

export default Header;
