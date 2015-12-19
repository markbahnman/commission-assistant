import models from '../models';
import valid from 'validator';

export default function createOpening(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an opening'});
    } else if (!req.body.title) {
      reject({status: 400, error: 'Missing opening title'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Opening must have a base price'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        if (!user) {
          reject({status: 403, error: 'No user found'})
        }
        const opening = {
          author: req.session.user,
          title: req.body.title,
          description: req.body.description || '',
          price: req.body.price,
          UserId: user.id
        };

        models.Opening
        .create(opening)
        .then((result) => {
          resolve({status: 201, success: true, opening: result});
        })
        .catch((err) => {
          console.error(err);
          reject({status: 500, success: false, error: err});
        });

      })
      .catch((err) => {
        console.error(err);
        reject({status: 500, success: false, error: err});
      });
    }
  });
};
