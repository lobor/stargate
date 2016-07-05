/*jshint esnext:true, browserify:true, unused:vars */
'use strict';

import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	submit(){
		axios
			.post('/user/login', {
				name: this.refs.name.value,
				password: this.refs.password.value
			})
			.then(function (response) {
				this.context.router.push('/');
				this.state.log = "user";
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
	
  render() {
		console.log(this);
    return (
      <div>
				Login
				<form method="POST" >
					<input name="name" id="name" ref="name" type="text" placeholder="Name" /><br/>
					<input name="password" id="password" ref="password" type="password" placeholder="Password" /><br/>
					<button type="button" onClick={this.submit.bind(this)}>Login</button>
				</form>
      </div>
    )
  }
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
// 	routes: React.PropTypes.array.isRequired
};

export default Login;