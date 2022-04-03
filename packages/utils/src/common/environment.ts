import { UNDEFINED_VARIABLE_MESSAGE } from './constants';

export const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(UNDEFINED_VARIABLE_MESSAGE(key));
  }

  return value;
};
