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
          databaseUrl: process.env.DATABASE_URL,
        }),
      ],
      providers: [SessionService],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    const prismaService = module.get<PrismaService>(PrismaService);

    testHelper = new TestHelper(prismaService);
  });

  test('Create a session', async () => {
    const userId = TestHelper.generateTestId();
    const input = TestHelper.createTestSessionInput(userId);

    const sessionCreated = await sessionService.create(input);

    expect(sessionCreated).toMatchObject<Session>(input.toSession());

    await testHelper.deleteTestUserSessions(sessionCreated.userId);
  });

  test('Retrieve a session by the token attached to it', async () => {
    const userId = TestHelper.generateTestId();
    const session = await testHelper.createTestSession({ userId });

    const sessionFound = await sessionService.findByToken(session.token);

    expect(session).toEqual(sessionFound);

    await testHelper.deleteTestUserSessions(session.userId);
  });

  test('Delete all sessions of a user', async () => {
    const userId = TestHelper.generateTestId();

    const sessionsCreated = await Promise.all([
      testHelper.createTestSession({ userId }),
      testHelper.createTestSession({ userId }),
      testHelper.createTestSession({ userId }),
    ]);

    await sessionService.deleteUserSessions(userId);

    const userSessions = await Promise.all(sessionsCreated.map(({ token }) => sessionService.findByToken(token)));

    expect(userSessions.every((session) => !session)).toBe(true);
  });
});
