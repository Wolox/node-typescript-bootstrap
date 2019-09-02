import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { Models } from '../../types/models';
import config from '../../config';
import dbConfiguration from './../../config/db';

const dbConfig = dbConfiguration[config.environment];
const models = {};
const basename = path.basename(__filename);
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default <Models>{ sequelize, ...models };
