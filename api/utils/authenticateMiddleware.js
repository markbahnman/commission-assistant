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
    if (req.session.user && req.session.user.type) {
      return next();
    } else {
      return next(new Error('permission denied'));
    }
  };
}
