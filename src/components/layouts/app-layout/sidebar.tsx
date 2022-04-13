import useUser from '../../../utils/hooks/use-user';
import useWindowSize from '../../../utils/hooks/use-window-size';
import MicrophoneIcon from '../../icons/microphone.svg';
import SettingsIcon from '../../icons/settings.svg';

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
            <MicrophoneIcon />
          </button>
          <button className="flex justify-center items-center p-1 hover:bg-slate-700 rounded-md">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
