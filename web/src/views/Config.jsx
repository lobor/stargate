import React, { Component } from 'react';

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import Input from 'react-toolbox/lib/input';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import FormChangePassword from './../components/forms/user/changePassword.jsx';
import FormMotion from './../components/forms/motion/config.jsx'

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

  // componentWillMount(){
  //   return this.context.io.run('config', {}, (res) => {
  //     if(res.response){
  //       this.setState(res.response);
  //     }
  //     else{
  //       this.context.router.push('/user/login');
  //     }
  //   });
  // }


  handleChange(field, value) {
    this
      .context
      .io
      .run('config:post', {
        value: value,
        name: field
      }, (res) => {
        if(res.response){
          this.setState(res.response);
        }
        else{
          this.context.router.push('/user/login');
        }
      });
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
          <FormMotion />
        </Tab>
        <Tab label='Admin'>
          <FormChangePassword />
        </Tab>
      </Tabs>

    )
	}
}
Config.contextTypes = {
	router: React.PropTypes.object.isRequired,
	io: React.PropTypes.object
};
export default Config;
