import test from 'ava';
import {
  app,
  createOpening,
  createUser
} from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  const customer = app();
  t.context.api = api;
  t.context.customer = customer;

  return createUser(customer)
    .then((user) => {
      t.context.customerUser = user;
      return createOpening(api);
    }).then((data) => {
      t.context = {
        ...t.context,
        ...data
      };
    });
});

test('should allow a user to create a quote with valid data', async t => {
  const formdata = { name: 'Mark', email: 'mark@example.com' };
  const quote = {
    openingid: t.context.opening.id,
    options: [],
    formdata: formdata
  };

  const res = await t.context.customer
    .post('/quote')
    .send(quote);

  t.is(res.status, 201);
});
