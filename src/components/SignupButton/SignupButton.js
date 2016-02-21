import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

import { signup } from 'redux/modules/auth';

@connect(state => ({auth: state.auth}),
         {signup})
export default class SignupButton extends Component {
  static propTypes = {
    auth: PropTypes.object,
    signup: PropTypes.func.isRequired
  }

  state = {
    open: false,
    error: {}
  }

  detectError = (username, email, password) => {
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

  handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    console.log('Trying to signup with', username, email, password);
    if (!this.detectError(username, email, password)) {
      this.props.signup(username, email, password);
    }
  }

  render() {
    const { auth: { loading, signupError } } = this.props;
    const { error } = this.state;
    let attemptError;
    if (signupError && !signupError.success) {
      attemptError = signupError.error;
    }
    const userError = error.username || attemptError;
    const emailError = error.email || attemptError;
    const passError = error.password || attemptError;
    const signupButton = loading ? <CircularProgress size={0.5}/> : <FlatButton label="signup" primary onTouchTap={this.handleSignup}/>;
    const actions = [ signupButton ];
    const dialog = { width: '25%', minWidth: '300px'};

    return (
      <ToolbarGroup float="right">
        <RaisedButton primary label="signup" onTouchTap={this.handleOpen} />
        <Dialog
          title="Signup"
          contentStyle={dialog}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextField
            hintText="username"
            errorText={userError}
            onChange={this.handleUserChange}/><br/>
          <TextField
            hintText="email"
            errorText={emailError}
            type="email"
            onChange={this.handleEmailChange}/><br/>
          <TextField
            hintText="password"
            errorText={passError}
            type="password"
            onChange={this.handlePasswordChange}/>
        </Dialog>
      </ToolbarGroup>
    );
  }
}
