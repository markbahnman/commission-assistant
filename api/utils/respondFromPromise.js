import PrettyError from 'pretty-error';

const pretty = new PrettyError();
// Resolves promise and returns a status code, redirect location, data payload, and error object
export default function respond(promise) {
  return (req, res, next) => {
    promise(req, res)
    .then((result) => {
      if (result instanceof Function) {
        result(res);
      } else {
        res.status(result.status || 200).json(result);
      }
    }, (reason) => {
      if (reason && reason.redirect) {
        res.redirect(reason.redirect);
      } else {
        if (process.env.NODE_ENV !== 'testing') {
          console.error('API ERROR:', pretty.render(reason));
        }
        res.status(reason.status || 500).json(reason);
      }
    })
    .catch(next);
  };
}
