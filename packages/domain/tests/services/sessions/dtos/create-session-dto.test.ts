import { Session } from '@sharingan/database';
import { isValidUUIDV4 } from '@sharingan/utils';

import { CreateSessionDto } from '../../../../index';
import { generateTestId } from '../../../setup/test-utils';

describe('Test Create Session DTO', () => {
  it('should return a valid role object', () => {
    const userId = generateTestId();

    const dto = new CreateSessionDto({
      expireDate: new Date(),
      userId,
    });

    const session = dto.toSession();

    expect(session).toMatchObject<Session>({
      expires: expect.any(Date),
      id: expect.any(String),
      token: expect.any(String),
      userId,
    });

    expect(isValidUUIDV4(session.token)).toEqual(true);
  });
});
