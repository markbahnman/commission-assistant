module.exports = (sequelize, DataTypes) => {
  const Opening = sequelize.define('Opening', {
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        Opening
        .belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Opening;
};
