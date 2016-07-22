import React, { Component } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';

class Config extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      switch_1: false,
    };
  }
  

  handleChange(field, value) {
    this.setState({[field]: value});
  }

	render() {
    return (
      <List>
        <ListSubHeader caption='Fonctionnalités' />
        <ListDivider />
        <ListItem
          caption='Video'
          legend="Webcam"
          leftIcon='videocam'
          rightActions={[
            <Switch key="switch_1" checked={this.state.switch_1} onChange={this.handleChange.bind(this, 'switch_1')} />
          ]}
        />
        <ListDivider />
      </List>
    )
	}
}
Config.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default Config;