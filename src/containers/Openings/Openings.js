import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as openingActions from 'redux/modules/opening';

@connect(state => ({auth: state.auth}),
        openingActions)
export default class CreateOpening extends Component {
  static propTypes = {
    auth: PropTypes.object,
    createOpening: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.refs.title;
    this.props.createOpening(title.value);
    title.value = '';
  }

  render() {
    const styles = require('./Openings.scss');
    const {auth: { user }} = this.props;
    console.log('Logged in as user', user);

    return (
      <div className={styles.openings}>
        <h1>Create New Opening</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="title" placeholder="title"/>
          <button onClick={this.handleSubmit}>Create</button>
        </form>
      </div>
    );
  }
}
