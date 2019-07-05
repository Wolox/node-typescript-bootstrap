module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return User;
};
