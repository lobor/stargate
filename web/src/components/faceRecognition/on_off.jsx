import React, { Component } from 'react';

import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import FontIcon from 'react-toolbox/lib/font_icon';

import Notify from './../commons/notify';


class OnOff extends Component{
  constructor(...args){
		super(...args);
    this.state = {
      state: false
    };

    this.handleChange = this.handleChange.bind(this);
	}

  handleChange(){
    this.context.io.run('fr:onOff', {state: !this.state.state}, (res) => {
      this.setState({state: !this.state.state})
    });
  }

  componentWillMount(){
    this.context.io.run('fr:onOff', {}, (res) => {
      this.setState({state: res})
    });
  }



  render(){
    return (
      <List selectable ripple>
        <ListItem
          caption='Face recognition'
          legend='Activate or disable'
          leftIcon='face'
          rightActions={[
            <Switch key="face_detection" checked={this.state.state} onChange={this.handleChange} />
          ]}
        />
      </List>
    );
  }
}

OnOff.contextTypes = {
	io: React.PropTypes.object
};

export default OnOff;
