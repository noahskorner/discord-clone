import useUser from '../../../utils/hooks/use-user';
import useWindowSize from '../../../utils/hooks/use-window-size';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();
  const { user } = useUser();

  return (
    <div
      style={{ height: heightStyle }}
      className="w-full md:w-sidebar bg-slate-800 overflow-hidden rounded-r-3xl md:rounded-r-none relative"
    >
      <div className="h-header shadow-header"></div>
      <div className="h-body overflow-y-auto space-y-2"></div>
      <div className="h-13 bg-slate-1000 absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-green-500"></div>
          <h6 className="font-semibold text-white text-xs truncate md:w-28">
            {user?.username}
          </h6>
        </div>
        <div className="flex items-center space-x-1">
          <button className="flex justify-center items-center p-1 hover:bg-slate-700 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          <button className="flex justify-center items-center p-1 hover:bg-slate-700 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
