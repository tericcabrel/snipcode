import { MutableRefObject, useEffect } from 'react';

/**
 * @link https://usehooks.com/useOnClickOutside
 * @param ref
 * @param handler
 */
const useClickOutside = (ref: MutableRefObject<any>, handler: (event: any) => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export { useClickOutside };
