import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  // let formatedPath = '';

  // if (process.env.NODE_ENV !== 'production') {
    if (__SERVER__) {
      // Prepend host and port of the API server to the path.
      return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
    } else {
      // Prepend `/api` to relative URL, to proxy to API server.
      return '/api' + adjustedPath;
    }
  // } else {
  //   if (__SERVER__) {
  //     formatedPath = 'http://commissionassistant-api.elasticbeanstalk.com' + adjustedPath;
  //   } else {
  //     formatedPath = adjustedPath;
  //   }
  // }

  return formatedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
