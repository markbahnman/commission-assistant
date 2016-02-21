import React, {Component, PropTypes} from 'react';

export default class Row extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}
