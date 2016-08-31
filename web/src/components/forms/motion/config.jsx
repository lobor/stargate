import React, { Component } from 'react';

import Notify from './../../commons/notify';

import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import FontIcon from 'react-toolbox/lib/font_icon';
import Dropdown from 'react-toolbox/lib/dropdown';

class Config extends Component{
  constructor(...args){
		super(...args);
    this.state = {
      stream: false,
      connect: false,
      record_video: false,
      record_picture: false,
      path: '',
      msg: false
    };
	}

  componentWillMount(){
    this.context.io.run('config:motion', {}, (res) => {
      if(res.response){
        this.setState(res.response);
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
    return (
      <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
        <Notify ref="notification" />
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
          <ListItem
            caption='Path where save file'
            leftIcon='folder'
            rightActions={[
              <Input type='text' key="path" label='/tmp/motion' onChange={this.handleChange.bind(this, 'path')} value={this.state.path} />
            ]}
          />
          <ListDivider />
        </List>
        <div style={(this.state.msg) ? {} : {'display': 'none'}} >
          {this.state.msg}
        </div>
        <Button type="submit" label="Save" raised primary />
      </form>
    );
  }
}

Config.contextTypes = {
	io: React.PropTypes.object
};

export default Config;
