'use strict';

import { ModelCtor, Model } from 'sequelize';
import models from '../app/models';

const tables = Object.values(models.sequelize.models);

const truncateTable = (model: ModelCtor<Model>): Promise<number> =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = (): Promise<number[]> => Promise.all(tables.map(truncateTable));

beforeEach(
  (done): Promise<void> =>
    truncateDatabase()
      .then(() => done())
      .catch(err => done(err))
);
