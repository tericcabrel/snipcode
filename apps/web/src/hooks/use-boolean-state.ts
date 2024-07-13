import { useCallback, useState } from 'react';

export const useBooleanState = (initialState = false) => {
  const [boolean, setBoolean] = useState(initialState);

  const setToTrue = useCallback(() => setBoolean(true), []);

  const setToFalse = useCallback(() => setBoolean(false), []);

  return [boolean, setToTrue, setToFalse] as const;
};
