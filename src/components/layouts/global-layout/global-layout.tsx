import Head from 'next/head';
import { ReactNode } from 'react';
import { AuthProvider } from '../../../utils/contexts/auth-context';
import { ToastProvider } from '../../../utils/contexts/toast-context';
import { WindowProvider } from '../../../utils/contexts/window-context';
import useWindowSize from '../../../utils/hooks/use-window-size';

interface GlobalLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: GlobalLayoutProps) => {
  const { heightStyle, widthStyle } = useWindowSize();
  return (
    <div
      style={{ width: widthStyle, height: heightStyle }}
      className="font-primary bg-slate-700 text-white"
    >
      {children}
    </div>
  );
};

const GlobalLayout = (props: GlobalLayoutProps) => {
  return (
    <WindowProvider>
      <ToastProvider>
        <AuthProvider>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              />
            </Head>
            <Layout {...props} />
          </>
        </AuthProvider>
      </ToastProvider>
    </WindowProvider>
  );
};

export default GlobalLayout;
