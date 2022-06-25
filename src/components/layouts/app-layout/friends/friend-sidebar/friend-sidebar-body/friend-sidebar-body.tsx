import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUser from '../../../../../../utils/hooks/use-user';
import { getLabel } from '../../../../../../utils/types/dtos/direct-message';
import Tooltip from '../../../../../feedback/tooltip';
import { FriendIcon, IconSize, PlusIcon } from '../../../../../icons';
import ProfileImage from '../../../profile-image/profile-image';
import DirectMessagesModal from '../direct-messages-modal';

const FriendSidebarBody = () => {
  const { user } = useUser();
  const router = useRouter();
  const [showDirectMessagesModal, setShowDirectMessagesModal] = useState(false);

  const handleCreateDMBtnClick = () => {
    setShowDirectMessagesModal(true);
  };

  return (
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
      <div className="mt-4 mb-2">
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
      {user?.directMessages.map((dm) => {
        return (
          <Link key={dm.id} href={`/direct-messages/${dm.id}`} passHref>
            <span
              className={`${
                router.query.directMessageId === dm.id.toString()
                  ? 'bg-slate-600 font-semibold text-white'
                  : 'hover:bg-slate-600/20 hover:font-medium hover:text-white'
              } flex cursor-pointer items-center justify-start space-x-4 rounded px-3 py-1 text-sm text-slate-300`}
            >
              <ProfileImage width={32} height={32} />
              <span className="truncate text-sm">{getLabel(user.id, dm)}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default FriendSidebarBody;
