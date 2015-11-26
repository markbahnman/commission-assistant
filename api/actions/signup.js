import models from '../models';
import valid from 'validator';

export default function signup(req) {
  return new Promise((resolve, reject) => {

    // Validate data
    if (!req.body.email || !valid.isEmail(req.body.email)) {
      console.error('email validation signup error', req.body);
      reject({status: 400, success: false, error: 'Validation Error: Invalid Email'});
    } else if (!req.body.username || !valid.isLength(req.body.username, 4)) {
      console.error('username validation signup error', req.body);
      reject({status: 400, success: false, error: 'Validation Error: Invalid Username'});
    } else if (!req.body.password || !valid.isLength(req.body.password, 4)) {
      console.error('password validation signup error', req.body);
      reject({status: 400, success: false, error: 'Validation Error: Invalid Password'});
    }

    // Salt and hash password
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    models.User
      .create(user)
      .then(() => {
        resolve({success:true});
      })
      .catch((error) => {
        console.error('Error creating new user', error);
        reject(500,{success:false, error:error});
      });
  });
}
