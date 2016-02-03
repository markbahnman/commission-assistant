import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

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
      <Helmet title="Home"/>
        {!user &&
          <div className={styles.content}>
            <h1>Welcome to Commission Assistant</h1>
            <div>
              <ul className={styles.features}>
                <li className={styles.feature}>
                  <h3>Streamline Opening</h3>
                  <img className={'iconic iconic-md ' + styles.icon} data-src="svg/tools.svg"/>
                  <p>Make opening for commissions as simple as a click.</p>
                </li>
                <li className={styles.feature}>
                  <h3>Handle Payments</h3>
                  <img className={'iconic iconic-md ' + styles.icon} data-src="svg/credit-card.svg"/>
                  <p>Feature text</p>
                </li>
                <li className={styles.feature}>
                  <h3>Manage Clients</h3>
                  <img className={'iconic iconic-md ' + styles.icon} data-src="svg/people.svg"/>
                  <p>Feature text</p>
                </li>
                <li className={styles.feature}>
                  <h3>Feature 4</h3>
                  <p>Feature text</p>
                </li>
                <li className={styles.feature}>
                  <h3>Feataure 5</h3>
                  <p>Feature text</p>
                </li>
                <li className={styles.feature}>
                  <h3>Taxes</h3>
                  <img className={'iconic iconic-md ' + styles.icon} data-src="svg/dollar.svg"/>
                  <p>Feature text</p>
                </li>
              </ul>
            </div>
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
