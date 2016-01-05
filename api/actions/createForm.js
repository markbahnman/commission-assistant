import models from '../models';
import valid from 'validator';

export default function createForm(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create a form'});
    } else if (!req.body.templateid || !req.body.inputs) {
      reject({status: 400, error: 'Missing templateid or inputs'});
    } else {
      // Find form object, include User model, check user model against user sessions, then add the inputtypes to template
      models.FormTemplate
      .findOne({where: { id: req.body.templateid }, include: [models.User]})
      .then((template) => {
        if (!template) {
          reject({status: 404, error: 'Error with finding form template'})
        }
        models.User
        .findOne({where: { username: req.session.user }})
        .then((user) => {
          if (user.username !== req.session.user) {
            reject({status: 403, error: 'Must use your own form data'})
          }
          models.FormInputType
          .findAll({where: { id: { $in: req.body.inputs }}})
          .then((result) => {
            template.addFormInputTypes(req.body.inputs).then((res) => {
              reject({status: 201, success: true, result: res});
            }).catch((err) => reject({status: 500, success: false, error: err}));
          }).catch((err) => reject({status: 500, success: false, error: err}));
        }).catch((err) => reject({status: 500, success: false, error: err}));
      }).catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
