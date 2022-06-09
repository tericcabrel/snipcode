import { Session, SessionRepositoryInterface } from '@sharingan/database';

import CreateSessionDto from './dtos/create-session-dto';

export default class SessionService {
  constructor(private _sessionRepository: SessionRepositoryInterface) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    return this._sessionRepository.create(createSessionDto.toSession());
  }

  async findByToken(token: string): Promise<Session | null> {
    return this._sessionRepository.findByToken(token);
  }

  async delete(id: string): Promise<void> {
    await this._sessionRepository.delete(id);
  }
}
