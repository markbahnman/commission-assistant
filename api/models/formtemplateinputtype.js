module.exports = (sequelize, DataTypes) => {
  const FormTemplateInputType = sequelize.define('FormTemplateInputType', {
    label: DataTypes.STRING,
    hint_text: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
      }
    }
  });
   return FormTemplateInputType;
}
