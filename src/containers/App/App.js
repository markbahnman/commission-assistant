import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import { isLoaded as isThemeLoaded, loadTheme } from 'redux/modules/theme';
import { routeActions } from 'react-router-redux';

import {NavLogin} from 'components';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

const muiTheme = getMuiTheme({}, { userAgent: 'all' });

const { object, func } = PropTypes;

@asyncConnect([{
  promise: ({store: {getState, dispatch}}) => {
    const promises = [];
    const state = getState();

    if (!isAuthLoaded(state)) {
      promises.push(dispatch(loadAuth()));
    }
    if (!isThemeLoaded(state)) {
      promises.push(dispatch(loadTheme(muiTheme)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({auth: state.auth}),
  {logout, pushState: routeActions.push})
@themeDecorator(muiTheme)
export default class App extends Component {
  static propTypes = {
    auth: object.isRequired,
    children: object.isRequired,
    logout: func.isRequired,
    pushState: func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    // if (!this.props.auth && nextProps.user) {
      // login
      // this.props.pushState('/loginSuccess');
    // } else if (this.props.user && !nextProps.user) {

    if (this.props.auth.user && !nextProps.auth.user) {
      // logout
      console.log('Not logged in at will receive props');
      this.props.pushState('/');
    }
  }

  render() {
    require('flexboxgrid');
    const styles = require('./App.scss');
    const background = { backgroundColor: muiTheme.appBar.color };
    const title = { color: muiTheme.appBar.textColor, fontSize: '24px' };
    // const { auth } = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Toolbar style={background}>
          <ToolbarGroup firstchild float="left">
            <ToolbarTitle text="Commission Assistant" style={title}/>
          </ToolbarGroup>
          <NavLogin/>
        </Toolbar>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
