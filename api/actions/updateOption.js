import models from '../models';
import valid from 'validator';
import { pick } from '../utils/objects';
import userExists from '../utils/users';
import update from '../utils/update';

export default function updateOption(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.title && !req.body.description && !req.body.price) {
      reject({status: 400, error: 'Must have some data to update option with'});
    } else if (!req.params.id) {
      reject({status: 400, error: 'Need id of option to update'});
    } else {
      userExists(req.session.user)
      .then((user) => {
        const fields = ['title', 'description', 'price'];
        const dataToUpdate = pick(req.body, ...fields);
        return update(models.Option, req.params.id, dataToUpdate)
      }, (err) => reject(err))
      .then((result) => {
        resolve(result);
      }, (err) => reject(err))
      .catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
