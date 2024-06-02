import { v4 as uuidv4 } from 'uuid';

import { generateRandomId, isValidUUIDV4 } from './uuid';

describe('UUID utility functions', () => {
  it('should generate a valid UUID', () => {
    const id = generateRandomId();

    expect(typeof id).toBe('string');
    expect(isValidUUIDV4(id)).toBe(true);
  });

  it('should validate a UUID', () => {
    const validUUID = uuidv4();
    const invalidUUID = 'invalid-uuid';

    expect(isValidUUIDV4(validUUID)).toBe(true);
    expect(isValidUUIDV4(invalidUUID)).toBe(false);
  });
});
