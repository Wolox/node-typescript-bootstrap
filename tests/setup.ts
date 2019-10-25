import { Model, DestroyOptions } from 'sequelize';
import models from '../app/models';

const tables = Object.values(models.sequelize.models);

const destroyOptions = {
  truncate: true,
  cascade: true,
  force: true,
  restartIdentity: true
} as DestroyOptions;

const truncateTable = (model: typeof Model): Promise<number> => model.destroy(destroyOptions);

const truncateDatabase = (): Promise<number[]> => Promise.all(tables.map(truncateTable));

beforeEach(
  (done): Promise<void> =>
    truncateDatabase()
      .then(() => done())
      .catch(err => done(err))
);
