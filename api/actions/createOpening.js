import models from '../models';
import valid from 'validator';

export default function createOpening(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an opening'});
    } else if (!req.body.title) {
      reject({status: 400, error: 'Missing opening title'});
    } else {
      models.User
      .findOne({where: { username: req.session.user }})
      .then((user) => {
        const opening = {
          author: req.session.user,
          title: req.body.title,
          UserId: user.id
        };

        models.Commission_Opening
        .create(opening)
        .then(() => {
          resolve({status: 201, success: true, opening: {title: req.body.title}});
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
