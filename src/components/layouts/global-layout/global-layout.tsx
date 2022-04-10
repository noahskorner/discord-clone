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
        <div
          style={{ width: widthStyle, height: heightStyle }}
          className="font-primary text-white bg-slate-700"
        >
          {children}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
};

export default GlobalLayout;
