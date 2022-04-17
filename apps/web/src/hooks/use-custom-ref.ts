import { useRef } from 'react';

export const useCustomRef = <T>(initialValue?: T) => {
  return useRef<T>(initialValue ?? null);
};
