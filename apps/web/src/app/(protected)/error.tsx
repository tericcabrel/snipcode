'use client';

import { ErrorContent } from '@/components/common/error';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return <ErrorContent error={error} onReset={reset} />;
}
