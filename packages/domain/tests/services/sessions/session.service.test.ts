import { Session } from '@sharingan/database';

import { sessionService } from '../../../index';
import {
  createTestSession,
  createTestSessionDto,
  deleteTestUserSessions,
  generateTestId,
} from '../../setup/test-utils';

describe('Test Session Service', function () {
  it('should create a session', async () => {
    // GIVEN
    const userId = generateTestId();
    const dto = createTestSessionDto(userId);

    // WHEN
    const sessionCreated = await sessionService.create(dto);

    // THEN
    expect(sessionCreated).toMatchObject<Session>(dto.toSession());

    await deleteTestUserSessions(sessionCreated.userId);
  });

  it('should find a session by token', async () => {
    // GIVEN
    const userId = generateTestId();
    const session = await createTestSession({ userId });

    // WHEN
    const sessionFound = await sessionService.findByToken(session.token);

    // THEN
    expect(session).toEqual(sessionFound);

    await deleteTestUserSessions(session.userId);
  });

  it('should delete all session of a user', async () => {
    // GIVEN
    const userId = generateTestId();

    const sessionsCreated = await Promise.all([
      createTestSession({ userId }),
      createTestSession({ userId }),
      createTestSession({ userId }),
    ]);

    // WHEN
    await sessionService.deleteUserSessions(userId);

    // THEN
    const userSessions = await Promise.all(sessionsCreated.map(({ token }) => sessionService.findByToken(token)));

    expect(userSessions.every((session) => !session)).toBe(true);
  });
});
