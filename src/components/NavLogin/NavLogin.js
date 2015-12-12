import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Login, Signup} from 'components';

@connect(state => ({ auth: state.auth }))
export default class NavLogin extends Component {
  static propTypes = {
    auth: PropTypes.object
  }

  state = {
    login: false,
    signup: false
  }

  toggleLogin = () => this.setState({login: !this.state.login, signup: false});

  toggleSignup = () => this.setState({signup: !this.state.signup, login: false});

  handleBack = () => this.setState({signup: false, login: false});

  render() {
    const {auth: {user}} = this.props;
    const {login, signup} = this.state;
    const styles = require('./NavLogin.scss');
    return (
      <div>
      {user &&
        <p>{user}</p>
      }
      {!user && login &&
        <div>
          <img onClick={this.handleBack} className={'iconic ' + styles.back} src="svg/circle-x.svg"/>
          <Login/>
        </div>
      }
      {!user && signup &&
        <div>
          <img onClick={this.handleBack} className={'iconic ' + styles.back} src="svg/circle-x.svg"/>
          <Signup/>
        </div>
      }
      {!user && !signup && !login &&
        <div className="button-group">
          <button onClick={this.toggleLogin}>Login</button>
          <button onClick={this.toggleSignup}>Signup</button>
        </div>
      }
      </div>
      );
  }
}
