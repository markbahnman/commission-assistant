import models from '../models';
import userExists from '../utils/users';
import valid from 'validator';

export default function createType(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.description) {
      reject({status: 400, error: 'Missing type name or description'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Type must have a base price'});
    } else {
      userExists(req.session.user)
      .then((user) => {
        const type = {
          type_name: req.body.name,
          base_price: req.body.price,
          type_description: req.body.description,
          UserId: user.id
        };

        models.Type
        .create(type)
        .then((result) => {
          resolve({status: 201, success: true, type: result.dataValues});
        }, (err) => reject({status: 500, success: false, error: err}));
      }, (err) => reject(err))
      .catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
};
