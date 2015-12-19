import models from '../models';
import valid from 'validator';
import pw from 'credential';

export default function login(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.username || !valid.isLength(req.body.username, 4)) {
      reject({status: 400, success: false, error: 'Login Error: Invalid Username'});
    } else if (!req.body.password || !valid.isLength(req.body.password, 4)) {
      reject({status: 400, success: false, error: 'Login Error: Invalid Password'});
    } else {
      // TODO sanitize username
      models.User
        .findOne({where: { username: req.body.username }})
        .then((user) => {
          if (user && user.hash) {
            pw.verify(user.hash, req.body.password, (err, isValid) => {
              if (isValid) {
                const authedUser = {
                  name: user.username
                };

                req.session.user = user.username;
                resolve({status: 200, success: true, user: user.username});

              } else {
                reject({status: 401, success: false, error: 'Invalid Password'});
              }
            });
          } else {
            reject({status: 401, success: false, error: 'Invalid User'});
          }
        })
        .catch((err) => {
          reject({status: 500, success: false, error: err});
      });
    }
  });
}
