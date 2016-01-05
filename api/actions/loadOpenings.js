import models from '../models';

export default function loadOpenings(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to get all openings'});
    } else {
      models.Opening
        .findAll({where: { author: req.session.user }})
        .then((openings) => {
          resolve({status: 200, openings: openings});
        })
        .catch((err) => {
          reject({status: 500, success: false, error: err});
        });
    }
  });
}
