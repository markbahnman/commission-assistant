import models from '../models';
import validateData from './validateFormData';
import validateOptions from './validateOptions';

export default function createQuote(req) {
  return new Promise((resolve, reject) => {
    if (!req.session || (req.session && !req.session.user)) {
      // TODO Make anonymous quote creation acceptable
      reject({status: 403, error: 'You need to be logged in to create a quote'});
    } else if (!req.body.openingid) {
      reject({status: 400, error: 'Missing opening id'});
    } else if (!req.body.options) {
      reject({status: 400, error: 'Missing options'});
    } else if (!req.body.formdata) {
      rejecet({status: 400, error: 'Missing form data'});
    } else {
      /*
       * Find opening
       * Get templateid from opening
       * validate formdata with that tempate id
       * validate options
       * create quote
       */
      // Validate form data server side,
      models.User
      .findOne({where: {username: req.session.user}, raw: true})
      .then((customer) => {
        const customerid = customer.id;

        models.Opening
        .findOne({where: { id: req.body.openingid }, include: [models.User]})
        .then((opening) => {

          const artistid = opening.User.id;
          models.FormTemplate
          .findOne({where:
                   { id: opening.FormTemplateId },
                   include: [models.User]})
          .then((template) => {
            if (!template) {
              reject({status: 404, error: 'Error with finding form template'})
            }

            validateData(template.id, req.body.formdata)
            .then((result) => {
              validateOptions(req.body.options)
              .then(() => {
                const quote = {
                  ArtistId: artistid,
                  CustomerId: customerid,
                  ToAcceptId: artistid,
                  OpeningId: req.body.openingid,
                  options_accepted_by_customer: req.body.options,
                  form_info: req.body.formdata,
                  payment_status: 'pending'
                };

                models.Quote
                .create(quote)
                .then((result) => {
                  resolve({status: 201, quote: result, success: true});
                }).catch((err) => reject({status: 500, error: err, success: false}));
              }).catch((err) => reject({status: 500, error: err, success: false}));
            }).catch((err) => reject({status: 500, error: err, success: false}));
          }).catch((err) => {
            reject({status: 500, success: false, error: err})
          });
        }).catch((err) => {
          reject({status: 500, success: false, error: err})
        });
      }).catch((err) => reject({status: 500, error: err, success: false}));
    }
  });
};
