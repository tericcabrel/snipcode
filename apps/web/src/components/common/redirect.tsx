'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRedirectToPath = (path: string) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [path, router]);
};

export const Redirect = ({ path }: { path: string }) => {
  useRedirectToPath(path);

  return <></>;
};
