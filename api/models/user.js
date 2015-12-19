module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    hash: DataTypes.STRING,
    email: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Opening)
      }
    }
  });

  return User;
};
