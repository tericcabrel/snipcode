import Session from '../../entities/session';
import BaseRepository from './_base';

type SessionRepositoryInterface = {
  deleteUserSessions: (userId: string) => Promise<void>;
} & Pick<BaseRepository<Session>, 'create'>;

export default SessionRepositoryInterface;
