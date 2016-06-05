import models from '../models';

export default function loadOpenings(req) {
  return new Promise((resolve, reject) => {
      models.Opening
        .findAll({where: { UserId: req.session.userid }, raw: true})
        .then((openings) => {
          resolve({status: 200, openings: openings});
        })
        .catch((err) => {
          reject({status: 500, success: false, error: err});
        });
  });
}
