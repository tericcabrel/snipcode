import { generateRandomId } from '@sharingan/utils';
import { useState } from 'react';

import { AddToastArgs, ToastContextType, ToastData, ToastShowArgs } from './types';

const TOAST_TIMEOUT = 3000;
const TOAST_ERROR_TIMEOUT = 5000;

export const defaultToastAction: ToastContextType = {
  toastError: (args) => console.log(args),
  toastSuccess: (args) => console.log(args),
  toastWarning: (args) => console.log(args),
};

export const useToastManager = () => {
  const [list, setList] = useState<ToastData[]>([]);

  const removeToast = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  };

  const addToast = ({ message, title, type }: AddToastArgs) => {
    const id = generateRandomId();
    const timeout = type === 'error' ? TOAST_ERROR_TIMEOUT : TOAST_TIMEOUT;

    const data: ToastData = {
      id,
      message,
      timerId: setTimeout(() => {
        removeToast(id);
      }, timeout),
      title,
      type,
    };

    const newList = [...list, data];

    setList(newList);
  };

  const toastSuccess = (args: ToastShowArgs) => {
    addToast({ ...args, type: 'success' });
  };

  const toastError = (args: ToastShowArgs) => {
    addToast({ ...args, type: 'error' });
  };

  const toastWarning = (args: ToastShowArgs) => {
    addToast({ ...args, type: 'warning' });
  };

  const closeToast = (id: string) => {
    const toast = list.find((item) => item.id === id);

    if (!toast) {
      return;
    }

    clearTimeout(toast.timerId);
    removeToast(id);
  };

  return {
    closeToast,
    list,
    toastError,
    toastSuccess,
    toastWarning,
  };
};
