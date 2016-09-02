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

  handleChange(name, value) {
    this.setState({[name]: value});
  }

	submit(e){
    e.preventDefault();
    this.context.io.run('config:motion:post', this.state, (res) => {
      if(res.response){
        this._notify.addNotify({
          msg: 'Has been saved',
          type: 'success'
        });
      }
      else{
      }
    });
	}

  render(){
    const countries = [
      { value: 'EN-gb', label: 'England' },
    ];
    let cam = [];
    for(let i = 0; i < this.state.nbWebcam; i++){cam.push(i);}
    // if(this.state.nbWebcam > 1){
    //   cam = <Button type="submit" label="Save" raised primary />
    // }



    return (
      <Tabs index={this.state.tabActive} onChange={this.handleTabChange}>
        <Notify ref="notification" />
        <Tab label='General' key='0'>
          <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
            <List>
              <ListDivider />
              <ListItem
                disabled={!this.state.connect}
                caption='Record video'
                legend='Record on motion detection'
                leftIcon='fiber_manual_record'
                rightActions={[
                  <Switch disabled={!this.state.connect} key="record_video" checked={this.state.record_video} onChange={this.handleChange.bind(this, 'record_video')} />
                ]}
              />
              <ListDivider />
              <ListItem
                disabled={!this.state.connect}
                caption='Record picture'
                legend='Record on motion detection'
                leftIcon='fiber_manual_record'
                rightActions={[
                  <Switch disabled={!this.state.connect} key="record_picture" checked={this.state.record_picture} onChange={this.handleChange.bind(this, 'record_picture')} />
                ]}
              />
              <ListDivider />
            </List>
            <Button type="submit" label="Save" raised primary />
          </form>
        </Tab>
        {this.state.webcam.map((el, i) => {
          let name = 'Webcam ' + (i + 1)
          return (
            <Tab label={name} key={i + 1}>
              <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
                <List>
                  <ListItem
                    caption='Path where save file'
                    leftIcon='folder'
                    rightActions={[
                      <Input type='text' key="path" label='/tmp/motion' onChange={this.handleChange.bind(this, 'path')} value={this.state.path} />
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
