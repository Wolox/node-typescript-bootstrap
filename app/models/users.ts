import { Sequelize, DataTypes } from 'sequelize';
import { UserModel } from '../../types/models';

module.exports = (sequelize: Sequelize, DataType: typeof DataTypes): UserModel => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const User = <UserModel>sequelize.define(
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
