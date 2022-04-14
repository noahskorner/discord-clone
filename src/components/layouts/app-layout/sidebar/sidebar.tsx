import useWindowSize from '../../../../utils/hooks/use-window-size';
import SidebarBody from './sidebar-body';
import SidebarFooter from './sidebar-footer';
import ServerHeader from './server-header';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();
  const router = useRouter();
  const isServerPage = router.pathname.toLowerCase().includes('server');

  return (
    <div
      style={{ height: heightStyle }}
      className="relative w-full overflow-hidden rounded-r-3xl bg-slate-800 md:w-sidebar md:rounded-r-none"
    >
      <div className="h-header shadow-header">
        {isServerPage && <ServerHeader />}
      </div>
      <div className="h-body space-y-2 overflow-y-auto">
        <SidebarBody />
      </div>
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
