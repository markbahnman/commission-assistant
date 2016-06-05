import test from 'ava';
import { app, createUser } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api);
});

test('should not allow a user to create a type with no description', async t => {
  const type = {
    name: 'Test Type',
    price: 25
  };

  const res = await t.context.api
    .post('/type')
    .send(type);

  t.is(res.status, 400);
});

test('should not allow a user to create a type with no price', async t => {
  const type = {
    name: 'Test Type',
    description: 'Test Type'
  };

  const res = await t.context.api
    .post('/type')
    .send(type);

  t.is(res.status, 400);
});

test('should not allow a user to create a type with no name', async t => {
  const type = {
    description: 'Test Type',
    price: 25
  };

  const res = await t.context.api
    .post('/type')
    .send(type);

  t.is(res.status, 400);
});

test('should allow a user to create a type', async t => {
  const type = {
    name: 'Test Type',
    description: 'Test Type',
    price: 25
  };

  const res = await t.context.api
    .post('/type')
    .send(type);

  t.is(res.status, 201);
  t.ok(res.body.type);
  t.is(res.body.type.base_price, 25);
  t.is(res.body.type.type_name, type.name);
});
