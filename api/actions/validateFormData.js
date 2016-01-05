import models from '../models';
import valid from 'validator';

export default function validate(formid, formdata) {
  return new Promise((resolve, reject) => {
    // Get all the keys, which should be ids of forminputtypes, select those
    // for each key run validation based on input_type
    // return ok or the keys which don't pass or are empty
    const keys = Object.keys(formdata);
    models.FormTemplate
    .findById(formid)
    .then((form) => {
      if(form) {
        form
        .getFormInputTypes()
        .then((inputs) => {
          // Check to see if we have all the inputs/data
          if(keys.length > 0 && inputs.length === keys.length) {
            // Validate each key
            // If an error put that in an array with a reason for each
            let invalids = [];
            inputs.forEach((input, index, arr) => {
              const key = input.get('input_text');
              const type = input.get('input_type');
              const value = formdata[key];
              switch (type) {
                case 'text':
                  if (valid.isNull(value)) {
                    invalids.push({key: key, reason: 'can\'t be empty'});
                  }
                  break;
                case 'email':
                  if (!valid.isEmail(value)) {
                    invalids.push({key: key, reason: 'must be email'});
                  }
                  break;
                case 'textbox':
                  if (valid.isNull(value)) {
                    invalids.push({key: key, reason: 'can\'t be empty'});
                  }
                  break;
                default:
                  invalids.push({key: key, reason: 'invalid type'});
              }
            });

            if(invalids.length > 0) {
              reject({error: new Error('TODO'), keys: invalids});
            } else {
              resolve({status: 200, success: true});
            }
          } else {
            reject({error: new Error('Missing form data keys'),
                   keys: inputs.map((input) => {
                     return {key: input.input_text, required: input.required};
                   })});
          }
        }).catch((err) => reject({error: err}));
      } else {
        reject({error: new Error('No such form template')});
      }
    }).catch((err) => reject({error: err}));
  });
}
