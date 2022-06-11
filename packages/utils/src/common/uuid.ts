import { v4 as uuidv4 } from 'uuid';

export const generateRandomId = (): string => {
  return uuidv4();
};

export const isValidUUIDV4 = (uuid: string): boolean => {
  const REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return REGEX.test(uuid);
};
