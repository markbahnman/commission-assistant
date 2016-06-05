import test from 'ava';
import validate from '../../api/actions/validateFormData';
import { app, createUser, createTemplate, createInput, createForm } from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;
  t.context.inputs = [];

  return createUser(api)
    .then((user) => {
      t.context.user = user
      return createTemplate(api);
    }).then((template) => {
      t.context.template = template;
      return createInput(api, 'Name');
    }).then((input) => {
      t.context.inputs = [ input.id ];
      return createInput(api, 'Email', 'email');
    }).then((input) => {
      t.context.inputs.push(input.id);
      return createForm(api, t.context.template.id, t.context.inputs);
    }).then((form) => {
      t.context.form = form;
    });
});

test('it should not validate with invalid templateid', t => {
  return validate(666, { name: 'john', email: 'text@example.com' })
  .then((result) => t.fail(), (err) => {
    t.ok(err.error);
  });
});

test('should not validate with missing inputs and valid data', t => {
  return validate(t.context.template.id, {name: 'john'})
  .then(() => t.fail(), (err) => {
    t.ok(err.error);
    t.ok(err.keys);
    t.is(err.keys.length, 2);
  });
});

test('should not validate with invalid email input', t => {
  return validate(t.context.template.id, {name: 'john', email: 'test.example.com'})
    .then(() => t.fail(), (err) => {
      t.ok(err.error);
      t.ok(err.keys);
      t.is(err.keys.length, 1);
      t.is(err.keys[0].key, 'email');
      t.is(err.keys[0].reason, 'must be email');
    });
});

test('should validate with correct number of inputs and valid data', t => {
  return validate(t.context.template.id, {name: 'john', email: 'test@example.com'})
    .then((result) => {
      t.ok(result);
      t.true(result.success);
    }, (err) => t.fail(err));
});
