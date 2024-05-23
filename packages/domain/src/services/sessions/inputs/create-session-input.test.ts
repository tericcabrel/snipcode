import { isValidUUIDV4 } from '@snipcode/utils';

import { CreateSessionInput } from './create-session-input';
import { TestHelper } from '../../../../tests/helpers';
import { Session } from '../session.entity';

describe('Test Create Session Input', () => {
  it('should return a valid role object', () => {
    const userId = TestHelper.generateTestId();

    const input = new CreateSessionInput({
      expireDate: new Date(),
      userId,
    });

    const session = input.toSession();

    expect(session).toMatchObject<Session>({
      expires: expect.any(Date),
      id: expect.any(String),
      token: expect.any(String),
      userId,
    });

    expect(isValidUUIDV4(session.token)).toEqual(true);
  });
});
