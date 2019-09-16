import { Sequelize, Model, BuildOptions } from 'sequelize';

export interface IModels {
  users: UserModel;
  sequelize: Sequelize;
}

export interface ISequelizeModel extends Model {
  associate: (db: dbType)=> void;
}

export type UserModel = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserModel;
};


export interface IUserModel extends ISequelizeModel {
  id: number;
  username: string;
}
