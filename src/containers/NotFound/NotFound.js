import React, {Component, PropTypes} from 'react';

class NotFound extends Component {
  static propTypes = {
    location: PropTypes.object
  }

  render() {
    console.log('Hitting not found route', this.props.location.pathname);
    return (
      <div className="container">
      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}

export default NotFound;
