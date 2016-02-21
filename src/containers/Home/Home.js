import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FeatureCard } from 'components';

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
      <div>
      <Helmet title="Home"/>
        {!user &&
          <div className="row around">
            <h1 className={'col-xs-12 ' + styles.title}>Welcome to Commission Assistant</h1>
            <FeatureCard title="Steamline Opening">
              <p>Make opening for commission as simple as a click.</p>
            </FeatureCard>
            <FeatureCard title="Handle Payments">
              <p>Feature text</p>
            </FeatureCard>
            <FeatureCard title="Manage Clients">
              <p>Feature text</p>
            </FeatureCard>
            <FeatureCard title="Taxes">
              <p>Feature text</p>
            </FeatureCard>
          </div>
        }
        {user &&
          <Link to="dashboard">Dashboard</Link>
        }
      </div>
    );
  }
}
