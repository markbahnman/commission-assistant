import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

@connect(state => ({theme: state.theme}))
export default class FeatureCard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    theme: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { theme, title } = this.props;
    const styles = require('./FeatureCard.scss');
    const textColor = theme.base.palette.alternateTextColor;
    const background = {
      backgroundColor: theme.base.palette.primary1Color,
      textAlign: 'center'
    };

    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
      <Card className={styles.card} style={background}>
        <CardTitle title={title} titleColor={textColor}/>
        <CardText color={textColor}>
          {this.props.children}
        </CardText>
        <CardActions>
          <FlatButton label="info" labelStyle={{color: textColor}}/>
        </CardActions>
      </Card>
      </div>
    );
  }
}
