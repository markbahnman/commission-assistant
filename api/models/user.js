module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       User.hasMany(models.Task)
  //     }
  //   }

  return User;
};
