import test from 'ava';
import { app, createUser } from '../helpers/utils';
import userExists from '../../api/utils/users';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api)
    .then((user) => {
      t.context.user = user;
    });
});

test('resolves correctly if user exists', t => {
  return userExists(t.context.user.username)
    .then((user) => {
      t.ok(user);
    }, (err) => t.fail(err));
});

test('rejects correctly uf user does not exist', t => {
  return userExists('invalid')
    .then(() => t.fail(), (err) => {
         t.ok(err);
         t.is(err.status, 403);
    });
});
