import models from '../models';

export default function health() {
  return new Promise((resolve, reject) => {
    models.User
    .count()
    .then((count) => {
      resolve({healthy: true});
    })
    .catch((error) => {
      console.error("Error in database health check", error);
      reject({healthy:false, error: error});
    });
  });
};
