import { AppProvider } from '../../../utils/contexts/app-context';
import useApp from '../../../utils/hooks/use-app';
import useWindowSize from '../../../utils/hooks/use-window-size';
import Header from './header';
import Servers from './servers/servers';
import Sidebar from './sidebar';
import { CSSTransition } from 'react-transition-group';
import AuthRoute from '../../routes/auth-route';
import { ServersProvider } from '../../../utils/contexts/servers-context';

interface AppLayoutProps {
  children: JSX.Element;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <AppProvider>
      <ServersProvider>
        <Layout {...props}></Layout>
      </ServersProvider>
    </AppProvider>
  );
};

const Layout = ({ children }: AppLayoutProps) => {
  const { heightStyle, isMobileWidth } = useWindowSize();
  const { showSidebar, setShowSidebar } = useApp();

  const handleMobileSidebarBtnClick = () => {
    setShowSidebar(false);
  };

  return (
    <AuthRoute
      element={
        <div className="w-full h-full flex overflow-hidden relative">
          <CSSTransition
            in={showSidebar || !isMobileWidth}
            timeout={200}
            classNames="slide-in"
            unmountOnExit
            appear={true}
          >
            <div className="w-full h-full flex absolute md:relative md:w-auto">
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
          <div style={{ height: heightStyle }} className="w-full flex flex-col">
            <Header />
            <div className="h-body">{children}</div>
          </div>
        </div>
      }
    />
  );
};

export default AppLayout;
