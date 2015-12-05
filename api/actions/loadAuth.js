export default function loadAuth(req) {
  return Promise.resolve(req.session.user || {status: 401, loaded: false});
}
