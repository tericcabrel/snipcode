import { PropsWithChildren, createContext, useContext } from 'react';

import { Toast } from './toast';
import { ToastContextType } from './types';
import { defaultToastAction, useToastManager } from './use-toast-manager';

type Props = PropsWithChildren<{}>;

const ToastContext = createContext<ToastContextType>(defaultToastAction);

const ToastProvider = ({ children }: Props) => {
  const { closeToast, list, toastError, toastSuccess, toastWarning } = useToastManager();

  return (
    <ToastContext.Provider value={{ toastError, toastSuccess, toastWarning }}>
      {children}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-20"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {list.map((item) => {
            return (
              <Toast
                key={item.id}
                message={item.message}
                onClose={() => closeToast(item.id)}
                type={item.type}
                title={item.title}
              />
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider!');
  }

  return context;
};

export { ToastProvider, useToast };
