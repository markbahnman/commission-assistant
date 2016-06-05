var models = require('../../api/models');

models.sequelize.sync({force: true});
