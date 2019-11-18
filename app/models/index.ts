import fs from 'fs';
import path from 'path';
import * as Sequelize from 'sequelize';

import { IModels, ISequelizeModel } from '../../types/models';
import config from '../../config';
import dbConfiguration from '../../config/db';

const dbConfig = dbConfiguration[config.environment];
const models: { [name: string]: ISequelizeModel } = {};
const basename = path.basename(__filename);
const fileExtension = config.isProduction ? '.js' : '.ts';
const sequelize = new Sequelize.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs.readdirSync(__dirname)
  .filter((file: string) => file.includes('.') && file !== basename && file.endsWith(fileExtension))
  .forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model as ISequelizeModel;
  });

Object.keys(models).forEach((modelName: string) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default { sequelize, ...models } as IModels;
