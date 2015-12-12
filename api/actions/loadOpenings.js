import models from '../models';

export default function loadOpenings(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to get all openings'});
    } else {
      models.Commission_Opening
        .findAll({where: { author: req.session.user }})
        .then((openings) => {
          console.log('Found openings in database', openings);
          let ret_openings = [];
          openings.map((opening) => {
            ret_openings.push({title: opening.title});
          });
          resolve({status: 200, openings: ret_openings});
        })
        .catch((err) => {
          reject({status: 500, success: false, error: err});
        });
    }
  });
}
