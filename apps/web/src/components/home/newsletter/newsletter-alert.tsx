import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, CrossIcon } from '@snipcode/front/icons';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

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
    icon: <CrossIcon />,
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
    icon: <CheckIcon />,
    title: 'Subscription successful',
  },
};

const NewsletterAlert = ({ handleClose, state = 'failure' }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const titleClasses = classNames('flex flex-col items-center text-2xl mb-6', {
    'text-green-600': state === 'success',
    'text-red-600': state === 'failure',
  });

  const content = alertContentMap[state];

  const closeModal = () => {
    handleClose();
    setIsOpen(false);
  };

  return (
    <Transition as={Fragment} show={isOpen} appear>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <div className={titleClasses}>
                    {content.icon}
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{content.title}</h3>
                  </div>

                  <p className="text-sm text-gray-500 text-center">{content.description}</p>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    type="button"
                    onClick={closeModal}
                  >
                    Got it!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { NewsletterAlert };
