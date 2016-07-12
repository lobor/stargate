/*jshint esnext:true, browserify:true, unused:vars */
'use strict';

import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(...args){
		super(...args);
		this.state = {msg: false};
	}

	submit(){
		this.setState({msg: false})
		axios
			.post('/user/login', {
				name: this.refs.name.value,
				password: this.refs.password.value
			})
			.then(function (response) {
				this.context.auth(true);
				this.context.router.push('/');
			}.bind(this))
			.catch(function (error) {
				this.setState({msg: error.data.errors.message})
			}.bind(this));
	}
	
  render() {
    return (
      <div className="card__list center">
				<form method="POST" className="card__container">
					<div  className="card__header">
						Login
					</div>
					<div  className="card__body">
						<div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >{this.state.msg}</div>
						<input name="name" id="name" ref="name" type="text" placeholder="Name" /><br/>
						<input name="password" id="password" ref="password" type="password" placeholder="Password" /><br/>
						<button type="button" onClick={this.submit.bind(this)}>Login</button>
					</div>
				</form>
      </div>
    )
  }
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func
};

export default Login;