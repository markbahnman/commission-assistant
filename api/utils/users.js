import models from '../models';

export default function userExists(username) {
  return new Promise((resolve, reject) => {
    models.User
    .findOne({where: {username: username}})
    .then((user) => {
      if (!user) {
        reject({ status: 403, error: `Error finding user ${username}` });
      }
      resolve(user);
    }, (err) => reject({ status: 403, error: `Error finding user ${username}` }));
  });
}
