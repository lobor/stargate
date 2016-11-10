import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import Redirect from 'react-router/Redirect';

class Login extends Component{
  constructor(...args){
		super(...args);
		this.state = {
      msg: false,
      name: false,
      password: false,
      remember: false,
      auth: false,
      redirect: '/'
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
			password: this.state.password,
			remember: this.state.remember
		}, (response) => {
      var options = {};
			if(response.success){
				this.context.auth(true);
        localStorage.setItem('user', JSON.stringify(response.data));

        // Convert query url on object
        let url = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        options = { auth: true };
        options.redirect = url.redirect || this.state.redirect;
			}
			else{
				options = {msg: response.errors.message};
			}
      console.log(options);
      this.setState(options)
		});
	}

  render(){
    return (
      <form className="card__container bg-blue-light" onSubmit={this.submit}>
        <div  className="card__body">
          <TextField name="name" id="name" type="text" required hintText="Name" onChange={this.change.bind(this, 'name')} /><br/>
          <TextField name="password" id="password" required type="password" hintText={Lang.password} onChange={this.change.bind(this, 'password')} /><br/>
          <Ui.Checkbox
            label={Lang.rememberMe}
            name="remember"
            onCheck={this.change.bind(this, 'remember')}
          />
          <div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >
            <FontIcon className='error' />
            {this.state.msg}
          </div>
          <RaisedButton type="submit" label={Lang.login} primary />
          {this.state.auth ? (<Redirect to={this.state.redirect} />) : ''}
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
