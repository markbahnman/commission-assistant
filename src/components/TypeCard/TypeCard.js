import React, {Component} from 'react';
// import { connect } from 'react-redux';
import valid from 'validator';

import Paper from 'material-ui/lib/paper';
import CardActions from 'material-ui/lib/card/card-actions';
import { Center } from 'components';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

// @connect(state => ({theme: state.theme}))
export default class TypeCard extends Component {
  // static propTypes = {
  //   theme: PropTypes.object
  // }
  state = {
    error: {}
  }

  handleCreate = () => {};
  handleTitle = (e) => this.setState({title: e.target.value});
  handleDescription = (e) => { this.setState({description: e.target.value}); };
  handlePrice = (e) => {
    const price = e.target.value;
    console.log(price);

    if (valid.isCurrency(price, {allow_negatives: false})) {
      this.setState({price: e.target.value, error: { price: ''}});
    } else {
      this.setState({error: { price: 'Invalid price' }});
    }
  }

  render() {
    const { error: { price } } = this.state;
    const style = { marginLeft: '20px' };

    return (
      <Center lg={6} md={6} sm={8} xs={10}>
        <Paper>
            <TextField
              fullWidth
              style={style}
              underlineShow={false}
              floatingLabelText="Title"
              hintText="e.g. Icon, Illustration, Pattern, etc"
              onChange={this.handleTitle}
              />
            <Divider/>
            <TextField
              fullWidth
              style={style}
              underlineShow={false}
              multiLine
              onChange={this.handleDescription}
              hintText="Description"/><br/>
            <TextField
              style={style}
              underlineShow={false}
              onChange={this.handlePrice}
              errorText={price}
              hintText="Price"/>
          <CardActions>
            <FlatButton label="create"/>
          </CardActions>
        </Paper>
      </Center>
    );
  }
}
