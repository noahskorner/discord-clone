import { createContext, useState } from 'react';
import ToastInterface, { Color } from '../types/interfaces/toast-interface';
import { v4 as uuid } from 'uuid';
import ToastManager from '../../components/feedback/toast-manager';

interface ToastContextInterface {
  toasts: ToastInterface[];
  // eslint-disable-next-line no-unused-vars
  removeToast: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  success: (title: string, body?: string) => void;
  // eslint-disable-next-line no-unused-vars
  danger: (title: string, body?: string) => void;
}

const defaultValues = {
  toasts: [],
  // eslint-disable-next-line no-unused-vars
  removeToast: (id: string) => {},
  // eslint-disable-next-line no-unused-vars
  success: (title: string, body?: string) => {},
  // eslint-disable-next-line no-unused-vars
  danger: (title: string, body?: string) => {},
};

export const ToastContext = createContext<ToastContextInterface>(defaultValues);

interface ToastProviderInterface {
  children: JSX.Element;
}

const DEFAULT_TOAST_DURATION = 5000;

export const ToastProvider = ({ children }: ToastProviderInterface) => {
  const [toasts, setToasts] = useState<ToastInterface[]>(defaultValues.toasts);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (color: Color, title: string, body?: string) => {
    const toast: ToastInterface = {
      id: uuid(),
      title,
      color,
      body,
    };
    setToasts((prev) => [toast, ...prev]);
    setTimeout(() => removeToast(toast.id), DEFAULT_TOAST_DURATION);
  };

  const success = (title: string, body?: string) => {
    addToast('success', title, body);
  };

  const danger = (title: string, body?: string) => {
    addToast('danger', title, body);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        success,
        danger,
        removeToast,
      }}
    >
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
