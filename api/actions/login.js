import models from '../models';
import valid from 'validator';
import pw from 'credential';

export default function login(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.username || !valid.isLength(req.body.username, 4)) {
      console.error('username validation login error', req.body);
      reject({status: 400, success: false, error: 'Login Error: Invalid Username'});
    } else if (!req.body.password || !valid.isLength(req.body.password, 4)) {
      console.error('password validation login', req.body);
      reject({status: 400, success: false, error: 'Login Error: Invalid Password'});
    } else {
      // console.log('Finding user doc for username',req.body.username);
      // TODO sanitize username
      models.User
        .findOne({where: { username: req.body.username }})
        .then((user) => {
          console.log('Returned user document',user);
          if (user && user.hash) {
            pw.verify(user.hash, req.body.password, (err, isValid) => {
              if (isValid) {
                const authedUser = {
                  name: req.body.name
                };

                req.session.user = authedUser;
                resolve({status: 200, success: true});

              } else {
                reject({status: 401, success: false, error: 'Invalid Password'});
              }
            });
          } else {
            console.log("Returned no such user");
            reject({status: 401, success: false, error: 'Invalid User'});
          }
        })
        .catch((err) => {
          console.error("error logging in user", err);
          reject({status: 500, success: false, error: err});
      });
    }
  });
}
