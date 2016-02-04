import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {Brand, NavLogin} from 'components';

import config from '../../config';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

const muiTheme = getMuiTheme({}, { userAgent: 'all' });

const { object, func } = PropTypes;

function fetchData(getState, dispatch) {
  const promises = [];
  const state = getState();

  if (!isAuthLoaded(state)) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({auth: state.auth}),
  {logout, pushState})
class App extends Component {
  static propTypes = {
    children: object.isRequired,
    auth: object,
    logout: func.isRequired,
    pushState: func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    // console.log(this.props);
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <nav>
          <div className={styles.pullLeft}>
            <Brand/>
          </div>
          <div className={styles.pullRight + ' ' + styles.login}>
            <NavLogin/>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default themeDecorator(muiTheme)(App);
