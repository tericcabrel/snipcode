import { Test, TestingModule } from '@nestjs/testing';

import { Session } from './session.entity';
import { SessionService } from './session.service';
import { TestHelper } from '../../../tests/helpers';
import { DomainModule } from '../../domain.module';
import { PrismaService } from '../prisma.service';

describe('Test Session Service', function () {
  let sessionService: SessionService;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule.forRootAsync({
          databaseUrl: process.env.TEST_DATABASE_URL,
        }),
      ],
      providers: [SessionService],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    const prismaService = module.get<PrismaService>(PrismaService);

    testHelper = new TestHelper(prismaService);
  });

  it('should create a session', async () => {
    // GIVEN
    const userId = TestHelper.generateTestId();
    const input = TestHelper.createTestSessionInput(userId);

    // WHEN
    const sessionCreated = await sessionService.create(input);

    // THEN
    expect(sessionCreated).toMatchObject<Session>(input.toSession());

    await testHelper.deleteTestUserSessions(sessionCreated.userId);
  });

  it('should find a session by token', async () => {
    // GIVEN
    const userId = TestHelper.generateTestId();
    const session = await testHelper.createTestSession({ userId });

    // WHEN
    const sessionFound = await sessionService.findByToken(session.token);

    // THEN
    expect(session).toEqual(sessionFound);

    await testHelper.deleteTestUserSessions(session.userId);
  });

  it('should delete all session of a user', async () => {
    // GIVEN
    const userId = TestHelper.generateTestId();

    const sessionsCreated = await Promise.all([
      testHelper.createTestSession({ userId }),
      testHelper.createTestSession({ userId }),
      testHelper.createTestSession({ userId }),
    ]);

    // WHEN
    await sessionService.deleteUserSessions(userId);

    // THEN
    const userSessions = await Promise.all(sessionsCreated.map(({ token }) => sessionService.findByToken(token)));

    expect(userSessions.every((session) => !session)).toBe(true);
  });
});
