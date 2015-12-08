import models from '../models';
import valid from 'validator';

export default function createOpening(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      reject({status: 403, error: 'You need to be logged in to create an opening'});
    } else if (!req.body.title) {
      reject({status: 400, error: 'Missing opening title'});
    } else {
      resolve({status: 201, success: true});
    }
  });
};
