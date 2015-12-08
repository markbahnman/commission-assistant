import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutablejs';
// import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import opening from './opening';
// import counter from './counter';
// import {reducer as form} from 'redux-form';
// import info from './info';
// import widgets from './widgets';

export default combineReducers({
  router: routerStateReducer,
  auth,
  opening
  // form,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),
  // info,
  // widgets
});
