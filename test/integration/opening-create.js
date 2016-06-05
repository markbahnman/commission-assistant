import test from 'ava';
import {
  app,
  createUser,
  createOption,
  createTemplate,
  createType,
  createForm,
  createInput
} from '../helpers/utils';

test.beforeEach(t => {
  const api = app();
  t.context.api = api;
  t.context.options = [];
  t.context.inputs = [];

  return createUser(api)
  .then(() => {
    return createOption(api)
  }).then((option) => {
    t.context.options.push(option.id);
    return createOption(api)
  }).then((option) => {
    t.context.options.push(option.id);
    return createTemplate(api);
  }).then((template) => {
    t.context.template = template;
    return createInput(api, 'Name', 'text');
  }).then((input) => {
    t.context.inputs.push(input.id);
    return createInput(api, 'Email', 'email');
  }).then((input) => {
    t.context.inputs.push(input.id);
    return createForm(api, t.context.template.id, t.context.inputs);
  }).then((form) => {
    t.context.form = form;
    return createType(api);
  }).then((type) => {
    t.context.type = type;
  });
});

test('should not allow a user to create an opening with an invalid templateid', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    templateid: 666,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 400);
});

test('should not allow a user to create an opening without a price', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    templateid: t.context.template.id,
    options: [],
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 400);
});

test('should not allow a user to create an opening without a type id', async t => {
  const opening = {
    title: 'Test Opening',
    templateid: t.context.template.id,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 400);
});

test('should not allow a user to create an opening without a templateid', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 400);
});

test('should not allow a user to create an opening without a title', async t => {
  const opening = {
    typeid: t.context.type.id,
    templateid: t.context.template.id,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 400);
});

test('should not allow a user to create an opening with an invalid typeid', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    templateid: 666,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
  .post('/openings')
  .send(opening);

  t.is(res.status, 400);
});

test('should allow a user to create an opening with no options', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    templateid: t.context.template.id,
    options: [],
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 201);
});

test('should allow a user to create an opening with options', async t => {
  const opening = {
    title: 'Test Opening',
    typeid: t.context.type.id,
    templateid: t.context.template.id,
    options: t.context.options,
    price: 25,
    slots: 2
  };

  const res = await t.context.api
    .post('/openings')
    .send(opening);

  t.is(res.status, 201);
});
