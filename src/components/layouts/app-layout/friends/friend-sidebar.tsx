import Link from 'next/link';
import { useRouter } from 'next/router';
import { FriendIcon, IconSize, PlusIcon } from '../../../icons';
import Sidebar from '../sidebar';

const FriendSidebar = () => {
  const router = useRouter();

  return (
    <Sidebar
      header={
        <div className="h-full w-full p-[0.625rem]">
          <button className="flex h-full w-full items-center justify-start rounded bg-slate-900 px-2 text-left text-xs font-semibold text-slate-300">
            Find or start a conversation
          </button>
        </div>
      }
      body={
        <div className="h-full w-full p-2">
          <Link href="/friends/online" passHref>
            <span
              className={`${
                router.pathname === '/friends/online'
                  ? 'bg-slate-600 font-semibold text-white'
                  : 'hover:bg-slate-600/20 hover:font-medium hover:text-white'
              } flex cursor-pointer items-center justify-start space-x-4 rounded px-3 py-[0.625rem] text-sm text-slate-300`}
            >
              <FriendIcon size={IconSize.lg} />
              <span>Friends</span>
            </span>
          </Link>
          <div className="mt-4">
            <span className="flex cursor-default items-center justify-between px-3 text-slate-300 hover:text-white">
              <span className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase">
                <span>Direct Messages</span>
              </span>
              <PlusIcon size={IconSize.sm} />
            </span>
          </div>
        </div>
      }
    />
  );
};

export default FriendSidebar;
