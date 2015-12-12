import React, {Component} from 'react';

export default class Brand extends Component {
  render() {
    const styles = require('./Brand.scss');

    return (
      <h1 className={styles.brand}>Commission Assistant</h1>
    );
  }
}
