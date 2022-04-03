import { getEnv } from '../../src/common/environment';
import { UNDEFINED_VARIABLE_MESSAGE } from '../../src/common/constants';

describe('Tests environment utils', () => {
  test('node env is defined', () => {
    // GIVEN
    const key = 'NODE_ENV';

    // WHEN
    const result = getEnv(key);

    // THEN
    expect(result).toBeTruthy();
  });

  test('environment variable not defined', () => {
    // GIVEN
    const key = 'UNDEFINED_VAR';

    // WHEN
    // THEN
    expect(() => getEnv(key)).toThrow(UNDEFINED_VARIABLE_MESSAGE(key));
  });
});
