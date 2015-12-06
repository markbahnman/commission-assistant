export default function loadAuth(req) {
  return Promise.resolve(req.session && req.session.user ? req.session.user : {status: 401, loaded: false});
}
