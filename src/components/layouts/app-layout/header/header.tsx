import Link from 'next/link';
import useApp from '../../../../utils/hooks/use-app';
import useChannel from '../../../../utils/hooks/use-channel';
import useUser from '../../../../utils/hooks/use-user';
import { BarsIcon, ChannelIcon, FriendIcon, IconSize } from '../../../icons';
import FriendButton from './friend-button';

const Header = () => {
  const { setShowSidebar } = useApp();
  const { channel } = useChannel();
  const { numIncomingPendingFriendRequests } = useUser();

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
      {channel ? (
        <div className="flex items-center space-x-1 text-slate-300">
          <ChannelIcon channelType={channel.type} size={IconSize.lg} />
          <p className="font-bold text-white">{channel.name}</p>
        </div>
      ) : (
        <div className="scrollbar-none flex w-full items-center justify-start space-x-5 overflow-x-scroll">
          <span className="flex items-center space-x-2">
            <FriendIcon className="text-slate-300" size={IconSize.lg} />
            <h6 className="mr-4 border-r border-slate-500 pr-4 text-sm font-semibold">
              Friends
            </h6>
          </span>
          <FriendButton href="/friends/online">Online</FriendButton>
          <FriendButton href="/friends/all">
            <span className="px-2">All</span>
          </FriendButton>
          <FriendButton href="/friends/pending">
            <span className="flex items-center space-x-2">
              <span>Pending</span>
              {numIncomingPendingFriendRequests > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs leading-none text-white ">
                  {numIncomingPendingFriendRequests}
                </span>
              )}
            </span>
          </FriendButton>
          <Link href="/friends/add" passHref>
            <span className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-green-800">
              Add friend
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
