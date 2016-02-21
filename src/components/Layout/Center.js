import React, {Component, PropTypes} from 'react';

export default class Center extends Component {
  static propTypes = {
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    text: PropTypes.bool,
    children: PropTypes.node
  }

  render() {
    const { lg, md, sm, xs, text, children } = this.props;
    const large = (lg || 12);
    const largeOffset = (12 - large) / 2;
    const medium = (md || lg || 12);
    const mediumOffset = (12 - medium) / 2;
    const small = (sm || md || lg || 12);
    const smallOffset = (12 - small) / 2;
    const xsmall = (xs || sm || md || lg || 12);
    const xsmallOffset = (12 - xsmall) / 2;
    const centering = text ? ' center-lg center-md center-sm center-xs' : '';

    const classString = `col-lg-${large} col-md-${medium} col-sm-${small} col-xs-${xsmall} col-lg-offset-${largeOffset} col-md-offset-${mediumOffset} col-sm-offset-${smallOffset} col-xs-offset-${xsmallOffset}${centering}`;

    return (
      <div className={classString}>
        {children}
      </div>
    );
  }
}
