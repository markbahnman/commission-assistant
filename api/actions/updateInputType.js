import models from '../models';
import valid from 'validator';
import { pickAndChoose } from '../utils/objects';
import userExists from '../utils/users';
import update from '../utils/update';

export default function updateInputType(req) {
  const input_types = ['text', 'email', 'textbox'];

  return new Promise((resolve, reject) => {
    if (!req.body.label && !req.body.text) {
      reject({status: 400, error: 'Missing input type label or text'});
    } else if (req.body.type && input_types.indexOf(req.body.type) < 0) {
      reject({status: 400,
             error: 'Type which must be on of: ' + input_types.join(' ')});
    } else if (req.body.hasOwnProperty('required') && typeof req.body.required !== 'boolean') {
      reject({status: 400, error: 'required must be a boolean'});
    } else if (!req.params.id) {
      reject({status: 400, error: 'Need id of input to update'});
    } else {
      userExists(req.session.user)
      .then((user) => {
        const fields = ['label', 'text', 'type', 'required'];
        const dataFields = ['input_label', 'input_text', 'input_type', 'required'];
        const dataToUpdate = pickAndChoose(req.body, fields, dataFields);

        return update(models.FormInputType, req.params.id, dataToUpdate)
        .create(type)
      }, (err) => reject(err))
      .then((result) => resolve(result), (err) => reject(err))
      .catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
