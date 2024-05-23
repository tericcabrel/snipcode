import cuid, { isCuid } from '@bugsnag/cuid';

export const dbID = {
  generate: () => cuid(),
  isValid: (id: string) => isCuid(id),
};
