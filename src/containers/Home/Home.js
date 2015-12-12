import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import config from '../../config';
import {Login, Signup} from 'components';

@connect(state => ({auth: state.auth}))
export default class Home extends Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render() {
    const styles = require('./Home.scss');
    const {auth} = this.props;
    const {user} = auth;

    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        {!user &&
          <div className="container">
            <h3>Signup Component</h3>
            <Signup />

            <h3>Login Component</h3>
            <Login />
          </div>
        }
        {user &&
          <div className="container">
            <p>Welcome {user} to Commission Assistant!</p>
            <Link to="/openings">Create Openings</Link>
          </div>
        }
      </div>
    );
  }
}
