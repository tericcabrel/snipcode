import { Icon, useSubscribeToNewsletter } from '@sharingan/front';
import { useState } from 'react';

import NewsletterAlert from '@/components/home/newsletter/newsletter-alert';
import useBooleanState from '@/hooks/use-boolean-state';
import { REGEX_EMAIL } from '@/utils/constants';

const isEmailValid = (email: string) => REGEX_EMAIL.test(email);

const NewsletterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [subscriptionState, setSubscriptionState] = useState<'success' | 'failure' | undefined>();
  const [isAlertOpened, openAlert, closeAlert] = useBooleanState(false);

  const { isLoading, subscribeToNewsletter } = useSubscribeToNewsletter();

  const handleSubscribe = async () => {
    if (!isEmailValid(email)) {
      return;
    }

    await subscribeToNewsletter({
      input: {
        email,
      },
      onError: () => {
        setSubscriptionState('failure');
        openAlert();
      },
      onSuccess: () => {
        setSubscriptionState('success');
        openAlert();
        setEmail('');
      },
    });
  };

  return (
    <div className="relative">
      {isAlertOpened && <NewsletterAlert handleClose={closeAlert} state={subscriptionState ?? 'success'} />}
      <input
        className="block w-full px-5 py-6 text-base font-normal text-black placeholder-gray-600 bg-white border border-gray-300 rounded-xl focus:border-black focus:ring-1 focus:ring-black font-pj focus:outline-none"
        disabled={isLoading}
        name="email"
        placeholder="Enter your email address"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-3">
        <button
          className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent sm:w-auto sm:py-3 hover:bg-opacity-90 rounded-xl"
          onClick={handleSubscribe}
        >
          {isLoading && <Icon.Spinner />}
          Get updates
        </button>
      </div>
    </div>
  );
};

export default NewsletterForm;
