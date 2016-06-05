import test from 'ava';
import { app, createUser } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;

  return createUser(api);
});

test('should not allow a user to create a input type with no label', async t => {
  const type = {
    text: 'Test Label'
  };

  const res = await t.context.api
    .post('/inputType')
    .send(type);

  t.is(res.status, 400);
});

test('should not allow a user to create an input type with no text', async t => {
  const type = {
    label: 'Text Label'
  };

  const res = await t.context.api
    .post('/inputType')
    .send(type);

  t.is(res.status, 400);
});

test('should allow a user to create a form input type', async t => {
  const type = {
    label: 'Test Label',
    text: 'Label',
    type: 'email',
    required: false
  };

  const res = await t.context.api
    .post('/inputType')
    .send(type);

  const inputType = res.body.inputType;

  t.is(res.status, 201);
  t.ok(inputType);
  t.is(inputType.input_label, type.label);
  t.is(inputType.input_text, type.text.toLowerCase());
  t.is(inputType.input_type, type.type);
  t.false(inputType.required);
});

test('created input types should have required true when not specified', async t => {
  const type = {
    label: 'Test Label',
    text: 'Label',
    type: 'email'
  };

  const res = await t.context.api
    .post('/inputType')
    .send(type);

  const inputType = res.body.inputType;

  t.is(res.status, 201);
  t.ok(inputType);
  t.is(inputType.input_label, type.label);
  t.is(inputType.input_text, type.text.toLowerCase());
  t.is(inputType.input_type, type.type);
  t.true(inputType.required);
});
