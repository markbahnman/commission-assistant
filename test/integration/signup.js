import test from 'ava';
import { initializeDB, cleanup, app } from '../helpers/utils';

test('health check works', async t => {
  t.plan(2);

  const res = await app().get('/health');

  t.is(res.status, 200);
  t.true(res.body.healthy);
});

test('creates user on signup', async t => {
  const user = {
    username: 'cleanuser',
    password: 'test',
    email: 'cleanuser@example.com'
  };

  const res = await app().post('/signup').send(user);

  t.is(res.status, 201);
  t.true(res.body.success);
  t.is(res.body.user, user.username);
});

test('sets the cookie when creating a user', async t => {
  const user = {
    username: 'cookieset',
    password: 'test',
    email: 'cookieset@example.com'
  };

  const res = await app().post('/signup').send(user);

  t.is(res.status, 201);
  t.ok(res.headers['set-cookie']);
});

test('returns an error with a bad user email', async t => {
  const res = await app()
    .post('/signup')
    .send({username: 'erremail', password: 'test', email: 'erremail'});

  t.is(res.status, 400);
  t.regex(res.body.error, /invalid email/i);
});

test('return an error with a bad username', async t => {
  const res = await app()
    .post('/signup')
    .send({username: 'err', password: 'test', email: 'erruser@example.com'});

  t.is(res.status, 400);
  t.regex(res.body.error, /invalid user/i);
});

test('return an error with a bad username', async t => {
  const res = await app()
    .post('/signup')
    .send({username: 'err', password: 'test', email: 'erruser@example.com'});

  t.is(res.status, 400);
  t.regex(res.body.error, /invalid user/i);
});

test('return an error with a bad password', async t => {
  const res = await app()
    .post('/signup')
    .send({username: 'errpass', password: 'err', email: 'errpass@example.com'});

  t.is(res.status, 400);
  t.regex(res.body.error, /invalid password/i);
});
