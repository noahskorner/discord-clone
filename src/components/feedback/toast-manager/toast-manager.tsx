import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useToasts from '../../../utils/hooks/use-toasts';
import useWindowSize from '../../../utils/hooks/use-window-size';
import Toast from '../toast';

const ToastManager = () => {
  const { toasts } = useToasts();
  const { heightStyle } = useWindowSize();

  return (
    <div
      className="scrollbar-none fixed left-0 top-0 right-0 z-50 overflow-y-auto p-2 sm:top-auto sm:bottom-0 sm:w-96"
      style={{ maxHeight: `calc(${heightStyle})` }}
    >
      <TransitionGroup className="space-y-2">
        {toasts.reverse().map((toast) => {
          return (
            <CSSTransition
              key={toast.id}
              timeout={200}
              classNames="fade-in"
              unmountOnExit
            >
              <Toast {...toast} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default ToastManager;
