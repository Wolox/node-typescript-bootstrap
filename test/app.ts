'use strict';

import { ModelCtor, Model } from 'sequelize';
import models from '../app/models';

const tables = Object.values(models.sequelize.models);

const truncateTable = (model: ModelCtor<Model<any,any>>) =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

beforeEach(done => {
  truncateDatabase().then(() => done());
});
