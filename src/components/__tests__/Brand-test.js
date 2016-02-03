import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { Brand } from 'components';
import { Provider } from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Brand', () => {
  const mockStore = {};

  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Brand/>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render the correct className', () => {
    const styles = require('components/Brand/Brand.scss');
    expect(styles.brand_text).to.be.a('string');
    expect(dom.className).to.include(styles.brand_text);
  });
});
