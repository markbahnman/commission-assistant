module.exports = (sequelize, DataTypes) => {
  const FormTemplate = sequelize.define('FormTemplate', {
    template_title: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        FormTemplate
        .belongsToMany(models.FormInputType, {
          through: 'FormTemplateInputType'
        });

        FormTemplate
        .belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

    return FormTemplate;
};
