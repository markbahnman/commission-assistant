import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import cookie from 'react-cookie';
// import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import {Brand, NavLogin} from 'components';
import config from '../../config';

@connect(
  state => ({auth: state.auth}),
  {pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  // componentWillReceiveProps(nextProps) {
    // if (!this.props.user && nextProps.user) {
    //   // login
    //   this.props.pushState('/loginSuccess');
    // } else if (this.props.user && !nextProps.user) {
    //   // logout
    //   this.props.pushState('/');
    // }
  // }

  static reduxAsyncConnect(params, store) {
    const {dispatch, getState} = store;
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    const styles = require('./App.scss');
    // const logoImage = require('./logo.svg');
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
