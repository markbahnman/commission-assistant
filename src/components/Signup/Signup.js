import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(state => ({ user: state.auth.user }),
           authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    signup: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const email = this.refs.email;
    this.props.signup(username.value, password.value, email.value);
    username.value = '';
    password.value = '';
    email.value = '';
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        {!user &&
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="username" placeholder="username"/>
          <input type="password" ref="password" placeholder="password"/>
          <input type="email" ref="email" placeholder="email"/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        }
        {user &&
          <div>
          </div>
        }
      </div>
    );
  }
}
