import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import opening from './opening';
import req from './req';
// import counter from './counter';

export default combineReducers({
  router: routerStateReducer,
  auth,
  opening,
  req
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // })
});
