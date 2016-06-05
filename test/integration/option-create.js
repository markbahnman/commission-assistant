import test from 'ava';
import { cleanup, app, createUser } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api)
    .then((user) => {
      t.context.user = user;
    });
});

test('should not allow a user to create an option with no title', async t => {
  const option = {
    price: '25.00',
    description: 'Tip'
  };

  const res = await t.context.api
    .post('/option')
    .send(option);

  t.is(res.status, 400);
});

test('should not allow a user to create an option with no description', async t => {
  const option = {
    title: 'Tip',
    price: '25.00'
  };

  const res = await t.context.api
    .post('/option')
    .send(option);

  t.is(res.status, 400);
});

test('should not allow a user to create an option with no price', async t => {
  const option = {
    title: 'Tip',
    description: 'Tip'
  };

  const res = await t.context.api
    .post('/option')
    .send(option);

  t.is(res.status, 400);
});

test('should allow a user to create an option with valid data', async t => {
  const option = {
    title: 'Tip',
    price: '25.00',
    description: 'Tip'
  };

  const res = await t.context.api
    .post('/option')
    .send(option)

  t.is(res.status, 201);
});
