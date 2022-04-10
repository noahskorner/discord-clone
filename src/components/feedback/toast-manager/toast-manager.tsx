import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useToasts from '../../../utils/hooks/use-toasts';
import useWindowSize from '../../../utils/hooks/use-window-size';
import Toast from '../toast';

const ToastManager = () => {
  const { toasts } = useToasts();
  const { heightStyle } = useWindowSize();

  return (
    <div
      className="left-0 top-0 sm:top-auto sm:bottom-0 fixed z-40 right-0 sm:w-96 overflow-y-auto scrollbar-none p-2"
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
