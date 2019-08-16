import { Sequelize, DataTypes } from 'sequelize';
import { User } from '../../types/models';

module.exports = (sequelize: Sequelize, DataType: typeof DataTypes): User => {
  const User = <User>sequelize.define(
    'users',
    {
      username: {
        type: DataType.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return User;
};
