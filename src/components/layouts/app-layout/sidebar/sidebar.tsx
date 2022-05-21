import useWindowSize from '../../../../utils/hooks/use-window-size';
import SidebarHeader from './sidebar-header';
import SidebarBody from './sidebar-body';
import SidebarFooter from './sidebar-footer';
import InviteFriendModal from './invite-people-modal';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();

  return (
    <>
      <div
        style={{ height: heightStyle }}
        className="relative w-full rounded-r-3xl bg-slate-800 md:w-sidebar md:rounded-r-none"
      >
        <div className="h-header shadow-header">
          <SidebarHeader />
        </div>
        <div className="h-body space-y-2">
          <SidebarBody />
        </div>
        <SidebarFooter />
      </div>
      <InviteFriendModal />
    </>
  );
};

export default Sidebar;
