import models from '../models';
import valid from 'validator';
import validateOptions from './validateOptions';

export default function createOpening(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an opening'});
    } else if (!req.body.title) {
      reject({status: 400, error: 'Missing opening title'});
    } else if (!req.body.templateid) {
      reject({status: 400, error: 'Missing form template id'});
    } else if (!req.body.typeid) {
      reject({status: 400, error: 'Missing type id'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Opening must have a base price'});
    } else if (!req.body.options) {
      reject({status: 400, error: 'Opening must have an array of options'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (!user) reject({status: 403, error: 'No user found'});
        validateOptions(req.body.options)
        .then((res) => {

          const opening = {
            title: req.body.title,
            description: req.body.description || '',
            price: req.body.price,
            TypeId: req.body.typeid,
            FormTemplateId: req.body.templateid,
            UserId: user.id,
            slots: req.body.slots || 0,
            options: req.body.options
          };

          models.Opening
          .create(opening)
          .then((result) => {
            resolve({status: 201, success: true, opening: result});
          }).catch((err) => {
            if (err.name === 'SequelizeForeignKeyConstraintError') {
              const index = err.index;
              const start = index.indexOf('_');
              const end = index.indexOf('_', start + 1);
              const fkey = index.slice(start, end);
              reject({status: 400, success: false, error: 'Invalid ID for ' + fkey});
            } else {
              reject({status: 500, success: false, error: err});
            }
          });
        }).catch((err) => reject({status: 400, error: err.error, success: false}));
      }).catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
