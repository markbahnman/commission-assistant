import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import cookie from 'react-cookie';
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
    const input = this.refs.username;
    this.props.login(input.value);
    // cookie.save('userId', input.value);
    input.value = '';
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        {!user &&
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="username"/>
          <input type="password" ref="password"/>
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
