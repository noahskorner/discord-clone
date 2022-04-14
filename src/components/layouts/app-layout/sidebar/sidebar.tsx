import useWindowSize from '../../../../utils/hooks/use-window-size';
import SidebarBody from './sidebar-body';
import SidebarFooter from './sidebar-footer';
import SidebarHeader from './sidebar-header';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="relative w-full overflow-hidden rounded-r-3xl bg-slate-800 md:w-sidebar md:rounded-r-none"
    >
      <div className="h-header shadow-header">
        <SidebarHeader />
      </div>
      <div className="h-body space-y-2 overflow-y-auto">
        <SidebarBody />
      </div>
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
