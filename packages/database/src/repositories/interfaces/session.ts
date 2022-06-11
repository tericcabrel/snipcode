import Session from '../../entities/session';
import BaseRepository from './_base';

type SessionRepositoryInterface = {
  deleteUserSessions: (userId: string) => Promise<void>;
  findByToken: (token: string) => Promise<Session | null>;
} & Pick<BaseRepository<Session>, 'create'>;

export default SessionRepositoryInterface;
