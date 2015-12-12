import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Login} from 'components';

@connect(state => ({ auth: state.auth }))
export default class LoginError extends Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render() {
    const {auth: {user}} = this.props;
    return (
      <div>
        {user &&
          <div></div>
        }
        {!user &&
          <Login/>
        }
      </div>
    );
  }
}
