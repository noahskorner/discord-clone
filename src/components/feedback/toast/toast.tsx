import useToasts from '../../../utils/hooks/use-toasts';
import ToastInterface from '../../../utils/types/interfaces/toast-interface';
import CloseIcon from '../../icons/close.svg';
import IconButton from '../../inputs/icon-button';

const TOAST_CLASSES = {
  success: 'toast-success',
  danger: 'toast-danger',
};

const Toast = ({ id, color, title, body }: ToastInterface) => {
  const { removeToast } = useToasts();

  const handleToastClick = () => {
    removeToast(id);
  };

  return (
    <div
      className={`${TOAST_CLASSES[color]} flex w-full items-stretch rounded bg-slate-800 text-sm shadow-md dark:shadow-2xl`}
    >
      <div className="w-full space-y-2 rounded py-5 pl-4">
        <h6 className="font-semibold text-white">{title}</h6>
        {body && <p className="text-slate-500 dark:text-slate-300">{body}</p>}
      </div>
      <div className="p-1">
        <IconButton onClick={handleToastClick}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Toast;
