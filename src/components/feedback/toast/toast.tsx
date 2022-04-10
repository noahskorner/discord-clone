import useToasts from '../../../utils/hooks/use-toasts';
import ToastInterface from '../../../utils/types/interfaces/toast-interface';

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
      className={`${TOAST_CLASSES[color]} w-full rounded bg-white dark:bg-slate-700 shadow-md dark:shadow-2xl flex items-stretch text-sm`}
    >
      <div className="w-full py-5 pl-4 space-y-2 bg-slate-700 rounded">
        <h6 className="font-semibold text-white">{title}</h6>
        {body && <p className="text-slate-500 dark:text-slate-300">{body}</p>}
      </div>
      <div className="p-1">
        <button
          onClick={handleToastClick}
          className="w-6 h-6 rounded-md flex justify-center items-center hover:bg-slate-600 hover:rotate-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
