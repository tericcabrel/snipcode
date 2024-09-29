import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@snipcode/front/components/ui/alert-dialog';
import { CircleCheckIcon, CircleXIcon } from '@snipcode/front/icons';
import classNames from 'classnames';
import React from 'react';

type Props = {
  handleClose: () => void;
  state: 'success' | 'failure';
};

type Content = {
  description: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};

const alertContentMap: Record<Props['state'], Content> = {
  failure: {
    description: <span>An error occurred while performing the subscription</span>,
    icon: <CircleXIcon size={48} />,
    title: 'Subscription failure',
  },
  success: {
    description: (
      <span>
        We&lsquo;ve sent you an email to confirm your subscription.
        <br />
        You will receive updates on the application progress.
      </span>
    ),
    icon: <CircleCheckIcon size={48} />,
    title: 'Subscription successful',
  },
};

export const NewsletterAlert = ({ handleClose, state = 'failure' }: Props) => {
  const titleClasses = classNames('flex flex-col items-center text-2xl mb-6', {
    'text-green-600': state === 'success',
    'text-red-600': state === 'failure',
  });

  const content = alertContentMap[state];

  const closeModal = () => {
    handleClose();
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent onEscapeKeyDown={closeModal}>
        <AlertDialogHeader>
          <AlertDialogTitle className={titleClasses}>
            {content.icon}
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">{content.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center mt-4">
          <AlertDialogAction
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Got it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
