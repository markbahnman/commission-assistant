import models from '../models';

export default function loadTypes(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to get all your types'});
    } else {
      models.Type
      .findAll({ where: { UserId: req.session.userid }, raw: true})
      .then((types) => {
        resolve({status: 200, types: types});
      }).catch((err) => reject({status: 500, success: false, error: err}));
    }
  });
}
