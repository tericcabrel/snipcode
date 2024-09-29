import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

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
  return (
    <AlertDialog open={open}>
      <AlertDialogContent onEscapeKeyDown={onCancelButtonClick}>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>{messageText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={onCancelButtonClick}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmButtonClick}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };
