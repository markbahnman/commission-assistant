import React, { Component, PropTypes } from 'react';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isOpeningLoaded, loadOpenings } from 'redux/modules/opening';
import { isLoaded as isTypeLoaded, loadTypes } from 'redux/modules/type';
import { connect } from 'react-redux';
import { TypeCard, Center, Row } from 'components';
import connectData from 'helpers/connectData';

function fetchData(getState, dispatch) {
  const promises = [];
  const state = getState();

  console.log('fetching data');
  if (!isAuthLoaded(state)) {
    promises.push(dispatch(loadAuth()));
  }
  if (!isOpeningLoaded(state)) {
    promises.push(dispatch(loadOpenings()));
  }
  if (!isTypeLoaded(state)) {
    promises.push(dispatch(loadTypes()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(state => ({opening: state.opening, type: state.type}))
export default class Dashboard extends Component {
  static propTypes = {
    opening: PropTypes.object,
    type: PropTypes.object
  }

  render() {
    const {opening: {openings}, type: {types} } = this.props;
    return (
      <div>
        {types.length <= 0 &&
        <Row>
          <Center text>
          <h1>Looks like you have a blank canvas!</h1>
          <h3>Why don't we get started by creating a type of art you want to sell</h3>
          </Center>
          <TypeCard/>
        </Row>
        }
        {types.length > 0 && openings.length <= 0 &&
          <Row>
            <Center text>
              <h1>Let's create an Opening</h1>
            </Center>
          </Row>
        }
      </div>
    );
  }
}
