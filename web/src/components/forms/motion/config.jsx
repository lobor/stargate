import React, { Component } from 'react';

import Notify from './../../commons/notify';

import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import FontIcon from 'react-toolbox/lib/font_icon';
import Dropdown from 'react-toolbox/lib/dropdown';

import {Tab, Tabs} from 'react-toolbox/lib/tabs';

class Config extends Component{
  constructor(...args){
		super(...args);
    this.state = {
      // stream: false,
      // connect: false,
      // record_video: false,
      // record_picture: false,
      webcam: [],
      // path: '',
      // msg: false,
      tabActive: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
	}

  handleTabChange(index){
    this.setState({tabActive: index});
  }

  componentWillMount(){
    this.context.io.run('config:motion', {}, (res) => {
      if(res){
        console.log(res);
        this.setState(res);
      }
      else{
        this.context.router.push('/user/login');
      }
    });
  }

  componentDidMount(){
    this._notify = this.refs.notification;
  }

  handleChange(name, index, value) {
    if(typeof value !== 'object'){
      let webcam = this.state.webcam;
      webcam[index][name] = value;
      this.setState({webcam: webcam});
    }
    else{
      this.setState({[name]: index});
    }
  }

	submit(index, e){
    if(!e){
      e = index;
    }
    e.preventDefault();
    // console.log(index);
    // console.log(this.state.webcam[index]);
    this.context.io.run('config:motion:post', this.state, (res) => {
      if(res.response){
        this._notify.addNotify({
          msg: 'Has been saved',
          type: 'success'
        });
      }
      else{
        this._notify.addNotify({
          msg: 'An error has been occured',
          type: 'error'
        });
      }
    });
	}

  render(){
    return (
      <Tabs index={this.state.tabActive} onChange={this.handleTabChange}>
        <Notify ref="notification" />
        <Tab label='General' key='0'>
          <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
            <List>
              <ListDivider />
              <ListItem
                caption='Record video'
                legend='Record on motion detection'
                leftIcon='fiber_manual_record'
                rightActions={[
                  <Switch key="record_video" checked={this.state.record_video} onChange={this.handleChange.bind(this, 'record_video')} />
                ]}
              />
              <ListDivider />
              <ListItem
                caption='Record picture'
                legend='Record on motion detection'
                leftIcon='fiber_manual_record'
                rightActions={[
                  <Switch key="record_picture" checked={this.state.record_picture} onChange={this.handleChange.bind(this, 'record_picture')} />
                ]}
              />
              <ListDivider />
            </List>
            <Button type="submit" label="Save" raised primary />
          </form>
        </Tab>
        {this.state.webcam.map((el, i) => {
          let name = 'Camera ' + (i + 1)
          return (
            <Tab label={name} key={i + 1}>
              <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this, i)}>
                <List>
                  <ListItem
                    caption='Path where save file'
                    leftIcon='folder'
                    rightActions={[
                      <Input type='text' key="path" label='/tmp/motion' onChange={this.handleChange.bind(this, 'target_dir', i)} value={this.state.webcam[i].target_dir} />
                    ]}
                  />
                  <ListDivider />
                </List>
                <Button type="submit" label="Save" raised primary />
              </form>
            </Tab>
          )
        })}
      </Tabs>
    );
  }
}

Config.contextTypes = {
	io: React.PropTypes.object
};

export default Config;
