import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
          <div>
            <h1>Welcome to Commission Assistant</h1>
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
