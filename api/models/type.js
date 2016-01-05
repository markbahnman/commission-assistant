module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    type_name: DataTypes.STRING,
    type_description: DataTypes.STRING,
    base_price: DataTypes.DECIMAL(10, 2)
  },
  {
    classMethods: {
      associate: function(models) {
        Type
        .belongsTo(models.User, {
          onDelete: "CASCADE",
          foreighKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Type;
};
