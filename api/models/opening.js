module.exports = (sequelize, DataTypes) => {
  const Opening = sequelize.define('Opening', {
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.STRING,
    slots: DataTypes.INTEGER,
    options: DataTypes.ARRAY(DataTypes.INTEGER)
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

        Opening
        .belongsTo(models.Type, {
          foreignKey: {
            allowNull: false
          }
        });

        Opening
        .belongsTo(models.FormTemplate, {
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
