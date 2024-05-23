import { Injectable } from '@nestjs/common';

import { CreateSessionInput } from './inputs/create-session-input';
import { Session } from './session.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionInput: CreateSessionInput): Promise<Session> {
    const input = createSessionInput.toSession();

    return this.prisma.session.create({
      data: {
        expires: input.expires,
        id: input.id,
        token: input.token,
        userId: input.userId,
      },
    });
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }

  async findByToken(token: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { token } });
  }
}
