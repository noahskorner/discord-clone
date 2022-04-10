import useApp from '../../../utils/hooks/use-app';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
