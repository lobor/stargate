/*jshint esnext:true, browserify:true, unused:vars */
'use strict';

import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
	submit(){
		// console.log(this);
		// console.log(this.refs.name.value);
		
		// this.refs.name.value;
		// this.refs.password.value;
		
		axios.post('/user/login', {
				name: this.refs.name.value,
				password: this.refs.password.value
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
  render() {
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
