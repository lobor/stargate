import React, { Component } from 'react';

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import Input from 'react-toolbox/lib/input';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import FormChangePassword from './../../components/forms/user/changePassword.jsx';
import FormMotion from './../../components/forms/motion/config.jsx';
import ModelFR from './../../components/faceRecognition/model.jsx';

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
    return this.context.io.run('config', {}, (res) => {
      if(res){
        this.setState(res);
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
        <Tab label='Video'>
          <FormMotion />
        </Tab>
        <Tab label='Admin'>
          <FormChangePassword />
        </Tab>
        <Tab label='Face recognition'>
          <ModelFR />
        </Tab>
      </Tabs>

    )
	}
}
Config.contextTypes = {
	io: React.PropTypes.object
};
export default Config;
