import { useEffect, useRef, useState } from 'react';
import useServer from '../../../../../utils/hooks/use-server';
import { CSSTransition } from 'react-transition-group';
import CreateChannelModal from './create-channel-modal';
import useApp from '../../../../../utils/hooks/use-app';
import {
  ChevronDownIcon,
  CloseIcon,
  IconSize,
  PencilIcon,
  PlusIcon,
  SettingsIcon,
  UserAddIcon,
} from '../../../../icons';

const SidebarHeader = () => {
  const { server } = useServer();
  const [showServerMenu, setShowServerMenu] = useState(false);
  const serverMenuTransitionRef = useRef(null);
  const serverMenuRef = useRef<null | HTMLDivElement>(null);
  const { setShowInvitePeopleModal, setShowCreateChannelModal } = useApp();

  const handleServerMenuBtnClick = () => {
    setShowServerMenu((prev) => !prev);
  };
  const handleInvitePeopleBtnClick = () => {
    setShowInvitePeopleModal(true);
  };
  const handleCreateChannelBtnClick = () => {
    setShowCreateChannelModal(true);
  };
  const handleServerMenuBlur = () => {
    setShowServerMenu(false);
  };

  useEffect(() => {
    if (showServerMenu) {
      (serverMenuRef.current as HTMLDivElement).focus();
    }
  }, [showServerMenu]);

  return (
    <div className="relative h-full w-full">
      <button
        onClick={handleServerMenuBtnClick}
        className="relative flex h-full w-full items-center justify-between rounded-tr-3xl py-2 px-4 hover:bg-slate-600 md:rounded-none"
      >
        <h5 className="max-w-80 truncate text-sm font-bold">{server?.name}</h5>
        <div className="flex h-4 w-4 items-center justify-center">
          {showServerMenu ? (
            <CloseIcon />
          ) : (
            <ChevronDownIcon size={IconSize.sm} />
          )}
        </div>
      </button>
      <CSSTransition
        in={showServerMenu}
        timeout={200}
        classNames="fade-in"
        unmountOnExit={true}
        ref={serverMenuTransitionRef}
      >
        <div
          ref={serverMenuRef}
          tabIndex={1}
          onBlur={handleServerMenuBlur}
          className="absolute top-full z-50 mt-2 w-full px-3"
        >
          <div className="h-full w-full rounded-md bg-slate-1100 p-2 shadow-xl">
            <button
              onClick={handleInvitePeopleBtnClick}
              className="flex w-full items-center justify-between rounded p-2 text-sm font-medium text-indigo-400 hover:bg-indigo-600 hover:text-white active:bg-indigo-800"
            >
              <span>Invite People</span>
              <div className="justfiy-center flex h-4 w-4 items-center">
                <UserAddIcon />
              </div>
            </button>
            <button className="flex w-full items-center justify-between rounded p-2 text-sm font-medium hover:bg-indigo-600 hover:text-white active:bg-indigo-800">
              <span>Server Settings</span>
              <div className="justfiy-center flex h-4 w-4 items-center">
                <SettingsIcon />
              </div>
            </button>
            <button
              onClick={handleCreateChannelBtnClick}
              className="flex w-full items-center justify-between rounded p-2 text-sm font-medium hover:bg-indigo-600 hover:text-white active:bg-indigo-800"
            >
              <span>Create Channel</span>
              <div className="justfiy-center flex h-4 w-4 items-center">
                <PlusIcon />
              </div>
            </button>
            <button className="flex w-full items-center justify-between rounded p-2 text-sm font-medium hover:bg-indigo-600 hover:text-white active:bg-indigo-800">
              <span>Edit Server Profile</span>
              <div className="justfiy-center flex h-4 w-4 items-center">
                <PencilIcon />
              </div>
            </button>
          </div>
        </div>
      </CSSTransition>
      <CreateChannelModal />
    </div>
  );
};

export default SidebarHeader;
