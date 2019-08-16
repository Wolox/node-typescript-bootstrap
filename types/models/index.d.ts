import { Sequelize, Model, BuildOptions } from 'sequelize';

export interface Models {
  users: User;
  sequelize: Sequelize;
}

export interface SequelizeModel extends Model {
  associate: (db: dbType) => void;
}

export type User = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export interface UserModel extends SequelizeModel {
  id: number;
}
