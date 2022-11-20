export type ToastType = 'error' | 'success' | 'warning';

export type ToastData = {
  id: string;
  message: string;
  timerId: any;
  title?: string;
  type: ToastType;
};

export type ToastShowArgs = {
  message: string;
  title?: string;
};

export type AddToastArgs = ToastShowArgs & { type: ToastType };

export type ToastContextType = {
  toastError: (args: ToastShowArgs) => void;
  toastSuccess: (args: ToastShowArgs) => void;
  toastWarning: (args: ToastShowArgs) => void;
};
