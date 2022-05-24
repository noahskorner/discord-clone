import useWindowSize from '../../../../utils/hooks/use-window-size';
import InviteFriendModal from '../channels/invite-people-modal';
import SidebarFooter from './sidebar-footer';

interface SidebarProps {
  header: JSX.Element;
  body: JSX.Element;
}

const Sidebar = ({ header, body }: SidebarProps) => {
  const { heightStyle } = useWindowSize();

  return (
    <>
      <div
        style={{ height: heightStyle }}
        className="relative w-full rounded-r-3xl bg-slate-800 md:w-sidebar md:rounded-r-none"
      >
        <div className="h-header shadow-header">{header}</div>
        <div className="h-body space-y-2">{body}</div>
        <SidebarFooter />
      </div>
      <InviteFriendModal />
    </>
  );
};

export default Sidebar;
