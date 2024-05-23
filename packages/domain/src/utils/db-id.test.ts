import { dbID } from './db-id';

describe('Test Database ID generator', () => {
  test('generate a valid id', () => {
    const id = dbID.generate();

    expect(dbID.isValid(id)).toEqual(true);
  });

  test.each([
    ['myinvalidid', false],
    ['111111111111', false],
    ['cl1fny73o0000e7czbglkhv0p', true],
  ])('detect validity of id %s', (id, expected) => {
    expect(dbID.isValid(id)).toEqual(expected);
  });
});
