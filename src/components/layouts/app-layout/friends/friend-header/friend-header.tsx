import Link from 'next/link';
import useUser from '../../../../../utils/hooks/use-user';
import { FriendIcon, IconSize } from '../../../../icons';
import Header from '../../header';
import FriendButton from './friend-button/friend-button';

const FriendHeader = () => {
  const { numIncomingPendingFriendRequests } = useUser();

  return (
    <Header>
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
    </Header>
  );
};

export default FriendHeader;
