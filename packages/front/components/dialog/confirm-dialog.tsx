import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRef } from 'react';

import { Button } from '../../forms/button';

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
    <Dialog
      as="div"
      static
      className="fixed z-10 inset-0 overflow-y-auto"
      initialFocus={cancelButtonRef}
      open={open}
      onClose={onCancelButtonClick}
    >
      <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <DialogTitle className="font-bold">Confirm Action</DialogTitle>
          <Description>{messageText}</Description>

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
      </DialogPanel>
    </Dialog>
  );
};

export { ConfirmDialog };
