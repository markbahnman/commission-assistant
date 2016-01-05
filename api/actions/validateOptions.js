import models from '../models';
import valid from 'validator';

export default function validateOptions(options) {
  return new Promise((resolve, reject) => {
    if (options && options.length > 0) {
      models.Option
      .findAll({where: { id: { $in: options }}, raw: true})
      .then((foundOptions) => {
        if (foundOptions.length === options.length) {
          resolve({success: true});
        } else {
          reject({success: false,
                 found: foundOptions.length,
                 error: new Error('Could not find all options')});
        }
      }).catch((err) => reject({error: new Error('Could not find Options')}));
    } else if (options && options.length === 0) {
      resolve({success: true});
    } else {
      reject({success: false, error: new Error('Invalid input for options to validate'), found: 0});
    }
  });
}
