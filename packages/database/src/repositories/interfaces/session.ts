import Session from '../../entities/session';
import BaseRepository from './_base';

type SessionRepositoryInterface = {
  findByToken: (token: string) => Promise<Session | null>;
} & Pick<BaseRepository<Session>, 'create' | 'delete'>;

export default SessionRepositoryInterface;
