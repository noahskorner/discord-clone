import useApp from '../../../utils/hooks/use-app';
import BarsIcon from '../../icons/bars.svg';

const Header = () => {
  const { setShowSidebar } = useApp();

  const handleSidebarBtnClick = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <header className="w-full h-header shadow-header flex items-center p-2">
      <button
        onClick={handleSidebarBtnClick}
        className="flex md:hidden justify-center items-center hover:bg-slate-800 rounded-md p-1"
      >
        <BarsIcon />
      </button>
    </header>
  );
};

export default Header;
