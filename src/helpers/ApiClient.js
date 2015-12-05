import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
    // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

function createRequest(method, path) {
  switch (method) {
    case 'post':
    case 'put':
      return superagent[method](formatUrl(path)).withCredentials();
    default:
      return superagent[method](formatUrl(path));
  }
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
        // console.log('Request for method ', method, ' path ', formatUrl(path));
        const request = createRequest(method, path);
        // console.log('Initiating request', request);

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          // console.log('End of api request', body, err);
          if (err) {
            reject(body || err);
          } else {
            resolve(body);
          }
        });
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
