import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import Redirect from 'react-router/Redirect'

class Login extends Component{
  constructor(...args){
		super(...args);
		this.state = {
      msg: false,
      name: false,
      password: false,
      auth: false
    };
    this.submit = this.submit.bind(this);
	}

  change(name, e, value){
		this.setState({[name]: value});
	}

	submit(e){
    e.preventDefault();
    e.stopPropagation();
		this.setState({msg: false});

    this.context.io.run('login', {
			name: this.state.name,
			password: this.state.password
		}, (response) => {
			if(response.response){
				this.context.auth(true);
        this.setState({auth: true})
			}
			else{
				this.setState({msg: response.errors.message})
			}
		});
	}

  render(){
    return (
      <form className="card__container bg-blue-light" onSubmit={this.submit}>
        <div  className="card__body">
          <TextField name="name" id="name" type="text" required hintText="Name" onChange={this.change.bind(this, 'name')} /><br/>
          <TextField name="password" id="password" required type="password" hintText={Lang.password}  onChange={this.change.bind(this, 'password')} /><br/>
          <div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >
            <FontIcon className='error' />
            {this.state.msg}
          </div>
          <RaisedButton type="submit" label={Lang.login} primary />
          {this.state.auth ? (<Redirect to="/" />) : ''}
        </div>
      </form>
    );
  }
};

Login.contextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Login;
