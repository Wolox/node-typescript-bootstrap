import { Sequelize, DataTypes } from 'sequelize';
import { UserModel } from '../../types/models';

module.exports = (sequelize: Sequelize, DataType: DataTypes): UserModel => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: DataType.STRING
      }
    },
    {
      timestamps: false
    }
  ) as UserModel;

  return User;
};
