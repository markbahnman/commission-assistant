import test from 'ava';
import { app, createUser, createOption, createTemplate, createInput } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;
  t.context.inputs = [];

  return createUser(api)
    .then(() => {
      return createOption(api)
    }).then((option) => {
      t.context.option = option;
      return createTemplate(api);
    }).then((template) => {
      t.context.template = template;
      return createInput(api);
    }).then((input) => {
      t.context.inputs.push(input);
      return createInput(api, 'textbox');
    }).then((input) => {
      t.context.inputs.push(input);
    });
});

test('it should allow a user to create a form', async t => {
  const inputs = t.context.inputs.map(i => i.id);

  const res = await t.context.api
    .post('/createForm')
    .send({ templateid: t.context.template.id, inputs: inputs });

  t.is(res.status, 201);
  t.ok(res.body.result);
  t.is(res.body.result.length, 1);
});
