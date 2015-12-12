import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as openingActions from 'redux/modules/opening';
import {areOpeningsLoaded, loadOpenings} from 'redux/modules/opening';
import connectData from 'helpers/connectData';
import {LoginError} from 'components';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!areOpeningsLoaded(getState())) {
    promises.push(dispatch(loadOpenings()));
  }
  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({auth: state.auth, openings: state.opening.openings}),
        openingActions)
export default class CreateOpening extends Component {
  static propTypes = {
    auth: PropTypes.object,
    openings: PropTypes.array,
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
    const {auth: { user }, openings } = this.props;
    console.log(user);

    return (
      <div className={styles.openings}>
        <LoginError />
        <h1>Create New Opening</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="title" placeholder="title"/>
          <button onClick={this.handleSubmit}>Create</button>
        </form>
        <ul>
        {openings.map((opening) => {
          return <li key={opening.id}>{opening.title}</li>;
        })}
        </ul>
      </div>
    );
  }
}
