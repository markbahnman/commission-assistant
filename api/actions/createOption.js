import models from '../models';
import valid from 'validator';

export default function createOption(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an option'});
    } else if (!req.body.openingid) {
      reject({status: 400, error: 'Must have a related opening to create an option for'});
    } else if (!req.body.title || !req.body.description) {
      reject({status: 400, error: 'Missing option title or description'});
    } else if (!req.body.price) {
      reject({status: 400, error: 'Option must have a base price'});
    } else {
      models.Opening
      .findOne({where: { id: req.body.openingid }})
      .then((opening) => {
        if (!opening) {
          reject({status: 404, error: 'No opening found'})
        }
        const option = {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          OpeningId: opening.id
        };

        models.Option
        .create(option)
        .then((result) => {
          resolve({status: 201, success: true, option: result.dataValues});
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
