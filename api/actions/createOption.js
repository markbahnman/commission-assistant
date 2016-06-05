import models from '../models';
import valid from 'validator';

export default function createOption(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.title || !req.body.description) {
      reject({status: 400, error: 'Missing option title or description'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Option must have a base price'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (user) {
        const option = {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          UserId: user.id
        };

        models.Option
        .create(option)
        .then((result) => {
          resolve({status: 201, success: true, option: result.dataValues});
        }).catch((err) => { reject({status: 500, success: false, error: err}) });
        } else {
          reject({status: 401, success: false, error: new Error('Invalid user')});
        }
      });
    }
  });
};
