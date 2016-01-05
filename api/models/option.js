module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    description: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        Option
        .belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Option;
};
