import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';

import { LoginButton, SignupButton } from 'components';

import { login, logout } from 'redux/modules/auth';

@connect(state => ({ auth: state.auth }),
         {login, logout})
export default class NavLogin extends Component {
  static propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  state = {
    open: false,
    error: {}
  }

  detectError = (username, password) => {
    let error = false;
    if (!username || username.trim().length <= 0) {
      error = true;
      this.setState({error: { username: 'Username is required' }});
    } else if (!password || password.length <= 0) {
      error = true;
      this.setState({error: { password: 'Password is required' }});
    } else if (password.length < 4) {
      error = true;
      this.setState({error: { password: 'Password must be at least 4 characters' }});
    }

    return error;
  }

  handleOpen = () => this.setState({open: true});
  handleClose = () => this.setState({open: false});
  handleUserChange = (e) => this.setState({username: e.target.value});
  handleEmailChange = (e) => this.setState({email: e.target.value});
  handlePasswordChange = (e) => this.setState({password: e.target.value});

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!this.detectError(username, password)) {
      console.log('No error, logging in with ', username, password);
      this.props.login(username, password);
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const { auth: { user } } = this.props;

    return (
      <div>
        {!user &&
          <ToolbarGroup float="right" lastchild>
            <SignupButton />
            <LoginButton />
          </ToolbarGroup>
        }
        {user &&
          <ToolbarGroup float="right" lastchild>
            <RaisedButton label="logout" onTouchTap={this.handleLogout}/>
          </ToolbarGroup>
        }
      </div>
      );
  }
}
