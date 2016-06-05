import test from 'ava';
import { app, createUser, createType } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api)
    .then(() => {
      return createType(api);
    }).then((type) => {
      t.context.type = type;
    });
});

test('should update with valid data', async t => {
  const updatedType = { price: 99 };

  const res = await t.context.api
    .put(`/type/${t.context.type.id}`)
    .send(updatedType);

  t.is(res.status, 200);
  t.is(res.body.result.base_price, 99);
});
