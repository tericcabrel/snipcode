import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRedirectToPath = (path: string) => {
  const router = useRouter();

  useEffect(() => {
    void router.push(path);
  }, [path, router]);
};

const Redirect = ({ path }: { path: string }) => {
  useRedirectToPath(path);

  return <></>;
};

export { Redirect };
