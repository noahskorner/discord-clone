import Head from 'next/head';
import { AuthProvider } from '../../../utils/contexts/auth-context';
import { ToastProvider } from '../../../utils/contexts/toast-context';
import useWindowSize from '../../../utils/hooks/use-window-size';

interface GlobalLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const { heightStyle, widthStyle } = useWindowSize();

  return (
    <AuthProvider>
      <ToastProvider>
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
          </Head>
          <div
            style={{ width: widthStyle, height: heightStyle }}
            className="font-primary text-white bg-slate-700"
          >
            {children}
          </div>
        </>
      </ToastProvider>
    </AuthProvider>
  );
};

export default GlobalLayout;
