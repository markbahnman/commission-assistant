import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import opening from './opening';
// import counter from './counter';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  opening
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // })
});
