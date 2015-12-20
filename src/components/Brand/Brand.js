import React, {Component} from 'react';
import {IndexLink} from 'react-router';

export default class Brand extends Component {
  render() {
    const styles = require('./Brand.scss');

    return (
      <IndexLink className={styles.brand_text} to="/">
        <h1 className={styles.brand}>Commission Assistant</h1>
      </IndexLink>
    );
  }
}
