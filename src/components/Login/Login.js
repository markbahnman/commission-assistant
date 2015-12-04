import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(state => ({ user: state.auth.user }),
           authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
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
    const {user} = this.props;
    return (
      <div>
        {!user &&
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="username" placeholder="username"/>
          <input type="password" ref="password" placeholder="password"/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        }
        {user &&
          <p>
            {user.name}
          </p>
        }
      </div>
    );
  }
}
