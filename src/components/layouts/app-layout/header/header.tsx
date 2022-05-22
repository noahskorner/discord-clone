import HomeState from '../../../../utils/enums/home-state';
import useApp from '../../../../utils/hooks/use-app';
import useChannel from '../../../../utils/hooks/use-channel';
import useHome from '../../../../utils/hooks/use-home';
import { BarsIcon, ChannelIcon, FriendIcon, IconSize } from '../../../icons';
import { MouseEvent } from 'react';

interface HomeButtonProps {
  state: HomeState;
  children: JSX.Element | string;
}

const HomeButton = ({ state, children }: HomeButtonProps) => {
  const { state: homeState, setState: setHomeState } = useHome();

  const handleHomeButtonClick = () => {
    setHomeState(state);
  };

  return (
    <button
      onClick={handleHomeButtonClick}
      className={`${
        homeState === state ? '' : 'text-slate-300 hover:bg-slate-600'
      } rounded-md px-2 py-1 text-sm font-medium`}
    >
      {children}
    </button>
  );
};

const Header = () => {
  const { setShowSidebar } = useApp();
  const { channel } = useChannel();
  const { setState: setHomeState } = useHome();

  const handleSidebarBtnClick = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleAddFriendBtnClick = () => {
    setHomeState(HomeState.ADD_FRIEND);
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
        <div className="flex w-full items-center justify-start space-x-4">
          <span className="flex items-center space-x-2">
            <FriendIcon className="text-slate-300" size={IconSize.lg} />
            <h6 className="mr-4 border-r border-slate-500 pr-4 text-sm font-semibold">
              Friends
            </h6>
          </span>
          <HomeButton state={HomeState.ONLINE}>Online</HomeButton>
          <HomeButton state={HomeState.ALL}>All</HomeButton>
          <HomeButton state={HomeState.PENDING}>Pending</HomeButton>
          <button
            onClick={handleAddFriendBtnClick}
            className="flex items-center justify-center rounded-md bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-green-800"
          >
            Add friend
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
