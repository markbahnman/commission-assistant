import test from 'ava';
import { app, createUser } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api)
    .then((user) => {
      t.context.user = user;
    });
});

test('logs in a user with correct details', async t => {
  const res = await t.context.api
    .post('/login')
    .send(t.context.user);

  t.is(res.status, 200);
  t.is(res.body.user, t.context.user.username);
});

test('fails to log in a user with incorrect details', async t => {
  const res = await t.context.api
    .post('/login')
    .send({username: t.context.user.username, password: 'wrongpassword'});

  t.is(res.status, 401);
  t.regex(res.body.error, /invalid password/i);
});
