import { dbId } from '../../index';

describe('Test Database ID generator', () => {
  test('generate a valid id', () => {
    const id = dbId.generate();

    expect(dbId.isValid(id)).toEqual(true);
  });

  test('detect invalid id', () => {
    const invalidId = 'myinvalidid';

    expect(dbId.isValid(invalidId)).toEqual(false);
  });

  test('detect invalid id', () => {
    const validId = 'cl1fny73o0000e7czbglkhv0p';

    expect(dbId.isValid(validId)).toEqual(true);
  });
});
