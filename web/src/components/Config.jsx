import React, { Component } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import axios from 'axios';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import Input from 'react-toolbox/lib/input';

class Config extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      webcam: {
        stream: false,
        connect: false,
        record: false,
        path: ''
      },
      tabActive: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount(){
    return axios
			.get('/api/config')
			.then((response) => {
        console.log(response.data.response)
        this.setState(response.data.response);
			})
      .catch((error) => {
        console.log(error);
        if(401 === error.status){
          this.context.router.push('/user/login');
        }
      });
  }


  handleChange(field, value) {
    // switch(field){
    //   case 'webcam':
    axios
      .post('/api/config', {
        value: value,
        name: field
      })
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
        // break;
    // }

  }

  handleTabChange(index){
    this.setState({tabActive: index});
  }

	render() {
    return (
      <Tabs index={this.state.tabActive} onChange={this.handleTabChange}>
        <Tab label='Fonctionnalités'>
          <List>
            <ListDivider />
            <ListItem
              disabled={!this.state.webcam.connect}
              caption='Video'
              legend={ this.state.webcam.connect ? 'Webcam' : 'Webcam not connected' }
              leftIcon='videocam'
              rightActions={[
                <Switch disabled={!this.state.webcam.connect} key="webcam" checked={this.state.webcam.stream} onChange={this.handleChange.bind(this, 'webcam')} />
              ]}
            />
            <ListDivider />
          </List>
        </Tab>
        <Tab label='Video'>
          <List>
            <ListDivider />
            <ListItem
              disabled={!this.state.webcam.connect}
              caption='Record'
              legend='Record on motion detection'
              leftIcon='fiber_manual_record'
              rightActions={[
                <Switch disabled={!this.state.webcam.connect} key="record" checked={this.state.webcam.record} onChange={this.handleChange.bind(this, 'record')} />
              ]}
            />
            <ListDivider />
            <ListItem
              caption='Path where save file'
              leftIcon='folder'
              rightActions={[
                <Input type='text' key="path" label='/tmp/motion' value={this.state.webcam.path} />
              ]}
            />
            <ListDivider />
          </List>
        </Tab>
        <Tab label='Admin'>

        </Tab>
      </Tabs>

    )
	}
}
Config.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default Config;
