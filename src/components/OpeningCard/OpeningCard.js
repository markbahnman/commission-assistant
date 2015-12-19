import React, {Component, PropTypes} from 'react';

export default class OpeningCard extends Component {
  static propTypes = {
    opening: PropTypes.object
  }

  componentDidMount() {
    if (window && window.IconicJS && document) {
      window.IconicJS().inject(document.getElementsByClassName('iconic'));
    }
  }

  render() {
    const styles = require('./OpeningCard.scss');
    const {opening} = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{opening.title}</h1>
        </div>
        <div className={styles.example}>
          <img data-text="EX" data-shape="square-rounded" data-src="svg/shape.svg" className="iconic" alt="shape" />
        </div>
        <div className={styles.description}>
          <p>{opening.description}</p>
        </div>
        <div className="options"></div>
        <button>Get Quote</button>
      </div>
    );
  }
}
