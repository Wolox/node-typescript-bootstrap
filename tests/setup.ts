import { getConnection } from 'typeorm';

const truncateDatabase = (): Promise<void> => getConnection().synchronize(true);

beforeEach(
  (done: jest.DoneCallback): Promise<void> =>
    truncateDatabase()
      .then(() => done())
      .catch(done)
);
