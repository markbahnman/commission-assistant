import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import { expect} from 'chai';
import { Login } from 'components';
import { Provider } from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import nock from 'nock';
import config from '../../config';
const client = new ApiClient();

describe('Login', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const mockStore = {
    auth: {
      loaded: false
    }
  };

  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Login/>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should display inputs when logged out', () => {
    const inputs = dom.getElementsByTagName('input');
    expect(inputs).to.have.length(2);
  });

  it('should show an error when logging in with invalid credentials', () => {
    nock('http://localhost')
    .post('/api/login')
    .reply(200, {success: true, user: 'test'});

    const inputs = dom.getElementsByTagName('input');
    const submit = dom.getElementsByTagName('button')[0];

    inputs[0].textContent = 'test';
    inputs[1].textContent = 'password';
    Simulate.click(submit);
  });
});
