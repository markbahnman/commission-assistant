import models from '../models';
import valid from 'validator';

export default function createTemplate(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.title) {
      reject({status: 400, error: 'Missing template title'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (!user) {
          reject({status: 403, error: 'Error with logging in user session'})
        }

        const template = {
          template_title: req.body.title,
          UserId: user.get('id')
        };

        models.FormTemplate
        .create(template)
        .then((result) => {
          resolve({status: 201, success: true, template: result.dataValues});
        })
        .catch((err) => {
          reject({status: 500, success: false, error: err});
        });
      })
      .catch((err) => {
        reject({status: 500, success: false, error: err});
      });
    }
  });
};
