import models from '../models';
import valid from 'validator';
import { pickAndChoose } from '../utils/objects';
import userExists from '../utils/users';
import update from '../utils/update';

export default function updateType(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.name && !req.body.description && !req.body.price) {
      reject({status: 400, error: 'Need some data in order to update the type'});
    } else if (!req.params.id) {
      reject({status: 400, error: 'Need id of type to update'});
    } else {
      userExists(req.session.user)
      .then((user) => {
        const fields = ['price', 'name', 'description'];
        const dataFields = ['base_price', 'type_name', 'type_description'];
        const dataToUpdate = pickAndChoose(req.body, fields, dataFields);
        return update(models.Type, req.params.id, dataToUpdate)
      }, (err) => reject(err))
      .then((result) => resolve(result), (err) => reject(err))
      .catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
