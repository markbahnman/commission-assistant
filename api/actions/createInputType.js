import models from '../models';
import valid from 'validator';

export default function createInputType(req) {
  const input_types = ['text', 'email', 'textbox'];
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an inputType'});
    } else if (!req.body.label || !req.body.text) {
      reject({status: 400, error: 'Missing input type label or text'});
    } else if (!req.body.type || input_types.indexOf(req.body.type) < 0) {
      reject({status: 400,
             error: 'Missing type which must be on of: ' + input_types.join(' ')});
    } else if (req.body.hasOwnProperty('required') && typeof req.body.required !== 'boolean') {
      reject({status: 400, error: 'required must be a boolean'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (!user) {
          reject({status: 403, error: 'Error with logging in user session'})
        }
        const type = {
          input_label: req.body.label,
          input_text: req.body.text,
          input_type: req.body.type,
          required: req.body.hasOwnProperty('required') ? req.body.required : true
        };

        models.FormInputType
        .create(type)
        .then((result) => {
          resolve({status: 201, success: true, inputType: result.dataValues});
        }).catch((err) => reject({status: 500, success: false, error: err}));
      }).catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
