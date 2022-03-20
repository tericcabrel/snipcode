import { sortNumbers } from '../../src/common/sort';

describe('Tests Utils', () => {
  test('sort numbers in ascending order', () => {
    // GIVEN
    const array = [67, 11, 89, 4, 22, 39, 50];

    // WHEN
    const result = sortNumbers(array);

    expect(result).toMatchInlineSnapshot(`
      [
        4,
        11,
        22,
        39,
        50,
        67,
        89,
      ]
    `);
  });
});
