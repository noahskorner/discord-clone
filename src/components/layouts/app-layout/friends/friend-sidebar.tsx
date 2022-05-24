import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Tooltip from '../../../feedback/tooltip';
import { FriendIcon, IconSize, PlusIcon } from '../../../icons';
import Sidebar from '../sidebar';
import DirectMessagesModal from './direct-messages-modal';

const FriendSidebar = () => {
  const router = useRouter();
  const [showDirectMessagesModal, setShowDirectMessagesModal] = useState(false);

  const handleCreateDMBtnClick = () => {
    setShowDirectMessagesModal(true);
  };

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
            <div className="relative flex cursor-default items-center justify-between px-3">
              <div className="flex w-full items-center space-x-1 text-left text-xs font-semibold uppercase text-slate-300 hover:text-white">
                <h6>Direct Messages</h6>
              </div>
              <Tooltip text="Create DM" direction={'top'} size="sm">
                <button
                  onClick={handleCreateDMBtnClick}
                  className="flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <PlusIcon size={IconSize.sm} />
                </button>
              </Tooltip>
              <DirectMessagesModal
                showModal={showDirectMessagesModal}
                setShowModal={setShowDirectMessagesModal}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FriendSidebar;
