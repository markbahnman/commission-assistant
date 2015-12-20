import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as openingActions from 'redux/modules/opening';
import {areOpeningsLoaded, loadOpenings} from 'redux/modules/opening';
import connectData from 'helpers/connectData';
import {LoginError, OpeningCard} from 'components';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!areOpeningsLoaded(getState())) {
    promises.push(dispatch(loadOpenings()));
  }
  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({openings: state.opening.openings}),
        openingActions)
export default class CreateOpening extends Component {
  static propTypes = {
    openings: PropTypes.array,
    createOpening: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.refs.title;
    const price = this.refs.price;
    this.props.createOpening(title.value, price.value);
    title.value = '';
    price.value = '';
  }

  render() {
    const styles = require('./Openings.scss');
    const {openings } = this.props;

    return (
      <div className={styles.openings}>
        <LoginError />
        <div className={styles.heading}>
          <h1>Create New Opening</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="title" placeholder="title"/>
            <input type="currency" ref="price" placeholder="price"/>
            <button onClick={this.handleSubmit}>Create</button>
          </form>
        </div>
        <div className={styles.cards}>
          {openings.map((opening) => {
            return <OpeningCard key={opening.id} opening={opening}/>;
          })}
        </div>
      </div>
    );
  }
}
