import {expect} from 'chai';
import configureStore from 'redux-mock-store';
import createStore from '../create';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import nock from 'nock';
import createMiddleware from '../middleware/clientMiddleware';
import transitionMiddleware from '../middleware/transitionMiddleware';
import ApiClient from '../../helpers/ApiClient';

import {login,LOGIN,LOGIN_SUCCESS,LOGIN_FAIL} from '../modules/auth';

const client = new ApiClient();
// const middleware = [createMiddleware(client), transitionMiddleware];
// const mockStore = configureStore(middleware);
const mockStore = {auth: {loaded: false}};
const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);

describe('Auth store', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('handles successful login', (done) => {
    nock('http://localhost')
      .post('/api/login')
      .reply(200, {success:true, user: 'testuser'});

    // const initialState = {loaded: false};
    // const expectedactions = [ {type: LOGIN }, {type: LOGIN_FAIL} ];
    // const store = mockStore(initialState, expectedactions, done);

    store.dispatch(login('testuser', 'test'));
    console.log(store.getState())
  });

  // it('handles unsuccessful login', (done) => {
  //   nock('http://example.com')
  //     .get('/')
  //     .reply(401, {success:false});
  //
  //   const initialState = Map();
  //   const actions = [ loginRequest(), loginError({success:false}) ];
  //   const store = mockStore(initialState, actions, done);
  //
  //   store.dispatch(login('testuser'));
  // });
});
