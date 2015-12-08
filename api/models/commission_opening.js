module.exports = (sequelize, DataTypes) => {
  const Commission_Opening = sequelize.define('Commission_Opening', {
    author: DataTypes.STRING,
    name: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        Commission_Opening
        .belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Commission_Opening;
};
