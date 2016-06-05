import test from 'ava';
import { app, createUser } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api);
});

test('should not allow a user to crate a form template with no title', async t => {
  const template = { text: 'Invalid' };

  const res = await t.context.api
    .post('/formTemplate')
    .send(template);

  t.is(res.status, 400);
});

test('should allow a user to create a form template', async t => {
  const template = { title: 'Test Template' };

  const res = await t.context.api
    .post('/formTemplate')
    .send(template);

  t.is(res.status, 201);
  t.is(res.body.template.template_title, template.title);
});
