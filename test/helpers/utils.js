import request from 'supertest-as-promised';
import models from '../../api/models';
import api from '../../api/api';

export function app() {
  return request.agent(api);
}

export function cleanup(model) {
  return models[model].sync({force: true});
}

export function initializeDB() {
  return models.sequelize.sync({force: true});
}

function genUser() {
  const username = (Math.random().toString(36)+'00000000000000000').slice(2, 10);
  return {
    username: username,
    password: 'test',
    email: `${username}@example.com`
  };
}

function create(agent, endpoint, data, key) {
  return new Promise((resolve, reject) => {
    agent
    .post(endpoint)
    .send(data)
    .then((result) => resolve(key ? result.body[key] : result),
          (err) => reject(err));
  });
}

export function createUser(agent) {
  return new Promise((resolve, reject) => {
    const user = genUser();
    agent
      .post('/signup')
      .send(user)
      .then(() => resolve(user), (err) => reject(err));
  });
}

export function createOption(agent) {
  const option = {
    title: 'Test Option',
    price: '25.00',
    description: 'Tip Option'
  };
  return create(agent, '/option', option, 'option');
}

export function createType(agent) {
  const type = {
    name: 'Test Type',
    price: 25,
    description: 'Test Description'
  };
  return create(agent, '/type', type, 'type');
}

export function createTemplate(agent) {
  const template = {
    title: 'Test Template'
  };
  return create(agent, '/formTemplate', template, 'template');
}

export function createForm(agent, templateid, inputs) {
  const form = {
    templateid,
    inputs
  };

  return create(agent, '/createForm', form, 'result');
}

export function createInput(agent, name, type) {
  const input = {
    label: 'Test Input',
    text: name ? name : 'Test',
    type: type ? type : 'text'
  };
  return create(agent, '/inputType', input, 'inputType');
}

export function createForm(agent, templateid, inputs) {
  const form = { templateid, inputs };
  return create(agent, '/createForm', form, 'form');
}

export function createOpening(agent) {
  let data = {
    options: [],
    inputs: []
  };

  return createUser(agent)
  .then(() => {
    return createOption(agent)
  }).then((option) => {
    data.options.push(option.id);
    return createOption(agent)
  }).then((option) => {
    data.options.push(option.id);
    return createTemplate(agent);
  }).then((template) => {
    data.template = template;
    return createInput(agent, 'Name', 'text');
  }).then((input) => {
    data.inputs.push(input.id);
    return createInput(agent, 'Email', 'email');
  }).then((input) => {
    data.inputs.push(input.id);
    return createForm(agent, data.template.id, data.inputs);
  }).then((form) => {
    return createType(agent);
  }).then((type) => {
    data.type = type;
    const opening = {
      title: 'Test Opening',
      typeid: type.id,
      templateid: data.template.id,
      options: data.options,
      price: 25,
      slots: 2
    };
    return create(agent, '/openings', opening, 'opening');
  }).then((opening) => {
    data.opening = opening;
    return data;
  });
}
