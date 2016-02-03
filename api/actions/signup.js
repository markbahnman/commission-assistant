import models from '../models';
import valid from 'validator';
import pw from 'credential';

export default function signup(req) {
  return new Promise((resolve, reject) => {

    // Validate data
    if (!req.body.email || !valid.isEmail(req.body.email)) {
      if (process.env.NODE_ENV !== 'testing') {
        console.error('email validation signup error', req.body);
      }
      reject({status: 400, success: false, error: 'Validation Error: Invalid Email'});
    } else if (!req.body.username || !valid.isLength(req.body.username, 4)) {
      if (process.env.NODE_ENV !== 'testing') {
        console.error('username validation signup error', req.body);
      }
      reject({status: 400, success: false, error: 'Validation Error: Invalid Username'});
    } else if (!req.body.password || !valid.isLength(req.body.password, 4)) {
      if (process.env.NODE_ENV !== 'testing') {
        console.error('password validation signup error', req.body);
      }
      reject({status: 400, success: false, error: 'Validation Error: Invalid Password'});
    }

    // Salt and hash password
    pw.hash(req.body.password, (err, hash) => {
      if (err) {
        reject({status: 500, success: false, error: 'User creation error: password'});
      }

      const user = {
        username: req.body.username,
        hash: hash,
        email: req.body.email
      };

      models.User
        .create(user)
        .then((userData) => {
          req.session.user = user.username;
          req.session.userid = userData.id;
          resolve({status: 201, success: true, user: user.username});
        })
        .catch((error) => {
          console.error('Error creating new user', error);
          reject({status: 500, success: false, error: error});
        });
    });
  });
}
