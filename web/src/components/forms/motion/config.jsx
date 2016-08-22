import React, { Component } from 'react';

import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import FontIcon from 'react-toolbox/lib/font_icon';

class Config extends Component{
  constructor(...args){
		super(...args);
    this.state = {
      stream: false,
      connect: false,
      record: false,
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

  handleChange(name, value) {
    console.log(name, value)
    this.setState({[name]: value});
  }

	submit(e){
    e.preventDefault();
    this.context.io.run('config:motion:post', this.state, (res) => {
      if(res.response){
        this.setState({msg: 'ok'});
      }
      else{
        // this.context.router.push('/user/login');
      }
    });
	}

  render(){
    return (
      <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
        <List>
          <ListDivider />
          <ListItem
            disabled={!this.state.connect}
            caption='Record'
            legend='Record on motion detection'
            leftIcon='fiber_manual_record'
            rightActions={[
              <Switch disabled={!this.state.connect} key="record" checked={(this.state.record !== 'off')} onChange={this.handleChange.bind(this, 'record')} />
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
