import React, { Component } from 'react';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import Notify from './../../commons/notify';

class ChangePassword extends Component{
  constructor(...args){
    super(...args)

    this.state = {
      old_password: false,
      new_password: false,
      comfirm_new_password: false,
      msg: false
    }


    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    this._notify = this.refs.notification;
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('user:changePassword', this.state, (res) => {
			if(res.response){
        this._notify.addNotify({msg: 'The password has been changed', type: 'success'});
			}
			else{
        this._notify.addNotify({msg: 'An error has occured', type: 'error'});
			}
		});
  }

  change(name, value){
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submit}>
          <Notify ref="notification" />
          <Input name="old_password" id="old_password" type="password" required label="Current password" onChange={this.change.bind(this, 'old_password')} /><br/>
          <Input name="new_password" id="new_password" type="password" required label="New password" onChange={this.change.bind(this, 'new_password')} /><br/>
          <Input name="confirm_new_password" id="comfirm_new_password" type="password" required label="Comfirm new password" onChange={this.change.bind(this, 'confirm_new_password')} /><br/>
          <div style={(this.state.msg) ? {} : {'display': 'none'}} >
            {this.state.msg}
          </div>
          <Button type="submit" label="Validate" raised primary />
        </form>
      </div>
    )
  }
}

ChangePassword.contextTypes = {
	io: React.PropTypes.object
};

export default ChangePassword;
