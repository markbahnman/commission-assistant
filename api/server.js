import api from './api';
import config from '../src/config';
import models from './models';

models.sequelize.sync().then(() => {
  api.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });
}).catch((error) => {
  console.error('Error syncing models', error);
});

