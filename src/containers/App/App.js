import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import cookie from 'react-cookie';
// import { IndexLink } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {Brand, NavLogin} from 'components';
import config from '../../config';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({auth: state.auth}),
  {pushState})
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
    //   this.props.pushState(null, '/loginSuccess');
    // } else if (this.props.user && !nextProps.user) {
    //   // logout
    //   this.props.pushState(null, '/');
    // }
  // }


  render() {
    const styles = require('./App.scss');
    // const logoImage = require('./logo.svg');
    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
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
