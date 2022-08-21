import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { Fragment, useRef } from 'react';

import Button from '../../forms/button';

type Props = {
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  messageText?: string | null;
  onCancelButtonClick: () => void;
  onConfirmButtonClick: () => void;
  open: boolean;
};

const ConfirmDialog = ({
  cancelText = 'Cancel',
  confirmText = 'Delete',
  isLoading = false,
  messageText = 'Are you sure you want to delete this item?',
  onCancelButtonClick,
  onConfirmButtonClick,
  open,
}: Props) => {
  const cancelButtonRef = useRef<any>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open && Boolean(messageText)}
        onClose={onCancelButtonClick}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Action
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{messageText}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-4">
                <Button
                  className="w-auto mt-2"
                  color="white-gray"
                  type="button"
                  onClick={onCancelButtonClick}
                  ref={cancelButtonRef}
                >
                  {cancelText}
                </Button>
                <Button
                  className="w-auto mt-2"
                  color="red"
                  type="button"
                  isLoading={isLoading}
                  onClick={onConfirmButtonClick}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { ConfirmDialog };
