import { dbID } from './db-id';

describe('Test Database ID generator', () => {
  it('should generate a valid id', () => {
    const id = dbID.generate();

    expect(dbID.isValid(id)).toEqual(true);
  });

  it.each([
    ['myinvalidid', false],
    ['111111111111', false],
    ['cl1fny73o0000e7czbglkhv0p', true],
  ])('should validate the ID "%s" as "%s"', (id, expected) => {
    expect(dbID.isValid(id)).toEqual(expected);
  });
});
