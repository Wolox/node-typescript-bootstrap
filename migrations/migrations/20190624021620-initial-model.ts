import { QueryInterface, DataTypes } from 'sequelize';
'use strict';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) =>
    queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false }
    }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('users')
};
