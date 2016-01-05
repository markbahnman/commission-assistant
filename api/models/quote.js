module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    reason: DataTypes.STRING,
    options_accepted_by_customer: DataTypes.ARRAY(DataTypes.INTEGER),
    options_artist_agreed_to: DataTypes.ARRAY(DataTypes.INTEGER),
    form_info: DataTypes.JSON,
    payment_status: DataTypes.ENUM('pending', 'payed', 'error')
  },
  {
    classMethods: {
      associate: function(models) {
        Quote
        .belongsTo(models.User, {
          as: 'Artist'
        });

        Quote
        .belongsTo(models.User, {
          as: 'Customer'
        });

        Quote
        .belongsTo(models.User, {
          as: 'ToAccept'
        });

        Quote
        .belongsTo(models.Opening, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Quote;
};
