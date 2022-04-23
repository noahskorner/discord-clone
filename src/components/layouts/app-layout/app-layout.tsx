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

interface AppLayoutProps {
  children: JSX.Element;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <AuthRoute
      element={
        <AppProvider>
          <ServersProvider>
            <ServerProvider>
              <Layout {...props}></Layout>
            </ServerProvider>
          </ServersProvider>
        </AppProvider>
      }
    />
  );
};

const Layout = ({ children }: AppLayoutProps) => {
  const { heightStyle, isMobileWidth } = useWindowSize();
  const { showSidebar, setShowSidebar } = useApp();

  const handleMobileSidebarBtnClick = () => {
    setShowSidebar(false);
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <CSSTransition
        in={showSidebar || !isMobileWidth}
        timeout={200}
        classNames="slide-in"
        unmountOnExit
        appear={true}
      >
        <div className="absolute flex h-full w-full md:relative md:w-auto">
          <div className="flex w-11/12 md:w-auto">
            <Servers />
            <Sidebar />
          </div>
          <button
            onClick={handleMobileSidebarBtnClick}
            className="h-full w-1/12 md:hidden"
          ></button>
        </div>
      </CSSTransition>
      <div style={{ height: heightStyle }} className="flex w-full flex-col">
        <Header />
        <div className="h-body">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
