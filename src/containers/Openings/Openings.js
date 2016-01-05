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
    const description = this.refs.description;
    this.props.createOpening(title.value, price.value, description.value);
    title.value = '';
    price.value = '';
    description.value = '';
  }

  render() {
    const styles = require('./Openings.scss');
    const {openings } = this.props;

    return (
      <div className={styles.openings}>
        <LoginError />
        <div className={styles.heading}>
          <h1>Create New Opening</h1>
          <form className="createOpening" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" ref="title" id="title" placeholder="title"/>
            <label htmlFor="price">Price</label>
            <input type="currency" ref="price" placeholder="price"/>
            <label htmlFor="description">Description</label>
            <textarea ref="description" id="description"/>
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
