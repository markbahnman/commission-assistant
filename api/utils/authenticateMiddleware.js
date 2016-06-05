import userExists from './users';

export function any(types) {
  return function(req, res, next) {
    if (req.session.user && types.indexOf(req.session.user.type) != -1) {
      return next();
    } else {
      return next(new Error('permission denied'));
    }
  };
}

export function is(type) {
  return function(req, res, next) {
    if (req.session.user && req.session.user.type == type) {
      return next();
    } else {
      return next(new Error('permission denied'));
    }
  };
}

export function loggedIn() {
  return function(req, res, next) {
    if (!req.session || (req.session && !req.session.user)) {
      res.status(403);
      res.json({status: 403, error: 'You need to be logged in to complete that action'});
      return;
    } else {
      return next();
    }
  };
}
