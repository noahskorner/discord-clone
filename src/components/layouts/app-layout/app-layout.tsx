import { AppProvider } from '../../../utils/contexts/app-context';
import useApp from '../../../utils/hooks/use-app';
import useWindowSize from '../../../utils/hooks/use-window-size';
import Header from './header';
import Servers from './servers/servers';
import Sidebar from './sidebar';
import { CSSTransition } from 'react-transition-group';
import AuthRoute from '../../routes/auth-route';
import { ServersProvider } from '../../../utils/contexts/servers-context';
import { ServerProvider } from '../../../utils/contexts/server-context';
import { ChannelProvider } from '../../../utils/contexts/channel-context';
import { RTCProvider } from '../../../utils/contexts/rtc-context';
import { SocketProvider } from '../../../utils/contexts/socket-context';
import useServer from '../../../utils/hooks/use-server';
import ServerMembers from './server-members';

interface AppLayoutProps {
  children: JSX.Element;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <AuthRoute
      element={
        <AppProvider>
          <SocketProvider>
            <ServersProvider>
              <ServerProvider>
                <ChannelProvider>
                  <RTCProvider>
                    <Layout {...props}></Layout>
                  </RTCProvider>
                </ChannelProvider>
              </ServerProvider>
            </ServersProvider>
          </SocketProvider>
        </AppProvider>
      }
    />
  );
};

const Layout = ({ children }: AppLayoutProps) => {
  const { widthStyle, heightStyle, isMobileWidth } = useWindowSize();
  const { showSidebar, setShowSidebar } = useApp();
  const { server } = useServer();

  const handleMobileSidebarBtnClick = () => {
    setShowSidebar(false);
  };

  const showServerMembers = server != null;

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <CSSTransition
        in={showSidebar || !isMobileWidth}
        timeout={200}
        classNames="slide-in"
        unmountOnExit
        appear={true}
      >
        <div className="absolute z-10 flex h-full w-11/12 md:relative md:w-auto">
          <div className="relative flex w-full rounded-r-3xl md:w-auto">
            <Servers />
            <Sidebar />
          </div>
        </div>
      </CSSTransition>
      {showSidebar && (
        <button
          onClick={handleMobileSidebarBtnClick}
          style={{ height: heightStyle, width: widthStyle }}
          className="absolute top-0 left-0 z-[5] bg-black/40 md:hidden"
        ></button>
      )}
      <div style={{ height: heightStyle }} className="flex w-full flex-col">
        <Header />
        <div className="flex h-full justify-between">
          <div
            style={{ maxHeight: `calc(${heightStyle} - 3rem)` }}
            className="h-full w-full"
          >
            {children}
          </div>
          {showServerMembers && <ServerMembers />}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
