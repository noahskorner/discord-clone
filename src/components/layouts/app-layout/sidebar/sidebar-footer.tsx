import useAuth from '../../../../utils/hooks/use-auth';
import useUser from '../../../../utils/hooks/use-user';
import MicrophoneIcon from '../../../icons/microphone.svg';
import SettingsIcon from '../../../icons/settings.svg';
import IconButton from '../../../inputs/icon-button';

const SidebarFooter = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  const handleLogoutButtonClick = async () => {
    await logout();
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-13 items-center justify-between bg-slate-1000 p-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLogoutButtonClick}
          className="h-9 w-9 rounded-full bg-green-500"
        ></button>
        <h6 className="truncate text-xs font-semibold text-white md:w-28">
          {user?.username}
        </h6>
      </div>
      <div className="flex items-center space-x-1">
        <IconButton>
          <MicrophoneIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SidebarFooter;
