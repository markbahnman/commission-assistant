import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

import { login } from 'redux/modules/auth';

@connect(state => ({auth: state.auth}),
         {login})
export default class LoginButton extends Component {
  static propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func.isRequired
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
  handlePasswordChange = (e) => this.setState({password: e.target.value});

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!this.detectError(username, password)) {
      console.log('No error, logging in with ', username, password);
      this.props.login(username, password);
    }
  }

  render() {
    const { auth: { loading, loginError } } = this.props;
    const { error } = this.state;
    const userError = error.username;
    const passError = error.password;
    const attemptError = loginError && loginError.error ? 'Wrong username or password' : '';
    const loginButton = loading ? <CircularProgress size={0.5}/> : <FlatButton label="login" primary onTouchTap={this.handleLogin}/>;
    const actions = [ loginButton ];
    const dialog = { width: '25%', minWidth: '300px'};

    return (
      <ToolbarGroup float="right">
        <RaisedButton label="login" onTouchTap={this.handleOpen} />
        <Dialog
          title="Login"
          contentStyle={dialog}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextField
            hintText="username"
            errorText={userError || attemptError}
            onChange={this.handleUserChange}/><br/>
          <TextField
            hintText="password"
            errorText={passError || attemptError}
            type="password"
            onChange={this.handlePasswordChange}/>
        </Dialog>
      </ToolbarGroup>
    );
  }
}
