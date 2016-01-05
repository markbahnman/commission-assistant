import models from '../models';
import valid from 'validator';

export default function createType(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create a type'});
    } else if (!req.body.name || !req.body.description) {
      reject({status: 400, error: 'Missing type name or description'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Type must have a base price'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (!user) {
          reject({status: 403, error: 'Error with logging in user session'})
        }
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
