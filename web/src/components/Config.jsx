import React, { Component } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import axios from 'axios';

class Config extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      webcam: {
        stream: false,
        connect: false
      }
    };
  }

  componentWillMount(){
    return axios
			.get('/api/config')
			.then((response) => {
        this.setState(response.data.response);
			})
      .catch((error) => {
        console.log(error);
        console.log(this);
        if(401 === error.status){
          this.context.router.push('/user/login');
        }
      });
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
          disabled={!this.state.webcam.connect ? true : false }
          caption='Video'
          legend={ this.state.webcam.connect ? 'Webcam' : 'Webcam not connected' }
          leftIcon='videocam'
          rightActions={[
            <Switch disabled={!this.state.webcam.connect ? true : false } key="webcam" checked={this.state.webcam.stream} onChange={this.handleChange.bind(this, 'webcam')} />
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