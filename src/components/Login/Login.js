import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(state => ({ auth: state.auth }),
           authActions)
export default class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login(username.value, password.value);
    username.value = '';
    password.value = '';
  }

  render() {
    const {auth} = this.props;
    const {user, loggingIn, loaded, loginError } = auth;
    const styles = require('./Login.scss');
    return (
      <div className={styles.inline}>
        <div className="loginError">
        {loggingIn && !loaded && 'Loading' }
        {!loggingIn && !loaded && loginError && <p>{loginError.error}</p>}
        </div>
        {!user &&
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="username" placeholder="username"/>
          <input type="password" ref="password" placeholder="password"/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        }
      </div>
    );
  }
}
