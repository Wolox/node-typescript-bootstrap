import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { IModels } from '../../types/models';
import config from '../../config';
import dbConfiguration from '../../config/db';

const dbConfig = dbConfiguration[config.environment];
const models = {};
const basename = path.basename(__filename);
const fileExtension = config.isProduction ? '.js' : '.ts';
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs.readdirSync(__dirname)
  .filter(file => file.includes('.') && file !== basename && file.endsWith(fileExtension))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default <IModels>{ sequelize, ...models };
