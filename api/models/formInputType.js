module.exports = (sequelize, DataTypes) => {
  const FormInputType = sequelize.define('FormInputType', {
    input_label: DataTypes.STRING,
    input_text: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('input_text', val.toString().toLowerCase());
      }
    },
    input_type: {
      type: DataTypes.ENUM('text', 'email', 'textbox'),
      allowNull: false,
      defaultValue: 'text'
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    classMethods: {
      associate: function(models) {
        FormInputType
        .belongsToMany(models.FormTemplate, {
          through: 'FormTemplateInputType'
        });
      }
    }
  });

  return FormInputType;
};
