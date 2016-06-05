import test from 'ava';
import { app, createUser, createOption } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api)
    .then(() => {
      return createOption(api);
    }).then((option) => {
      t.context.option = option;
    });
});

test('should update the option with valid data', async t => {
  const updatedOption = { price: 99 };

  const res = await t.context.api
    .put(`/option/${t.context.option.id}`)
    .send(updatedOption);

  t.is(res.status, 200);
  t.is(res.body.result.price, updatedOption.price);
});

test('should reject an update with no data', async t => {
  const res = await t.context.api
    .put(`/option/${t.context.option.id}`)
    .send({});

  t.is(res.status, 400);
});
