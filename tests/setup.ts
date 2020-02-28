import { getConnection, createConnection } from 'typeorm';
import typeOrmConfig from '../src/db/config';

const truncateDatabase = (): Promise<void> => getConnection().synchronize(true);

beforeAll(() => createConnection(typeOrmConfig));

beforeEach(
  (done: jest.DoneCallback): Promise<void> =>
    truncateDatabase()
      .then(() => done())
      .catch(done)
);
