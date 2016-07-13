/*jshint esnext:true, browserify:true, unused:vars */
'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardActions, CardTitle } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

class Login extends Component {
	constructor(...args){
		super(...args);
		this.state = {msg: false};
	}

	submit(e){
		e.preventDefault();
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
			<Card style={{width: '350px', margin: 'auto'}}>
				<CardTitle
					title="Login"
					style={{"textAlign":"center"}}
				/>
				<CardText>
					<form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
						<div  className="card__body">
							<div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >{this.state.msg}</div>
							<Input name="name" id="name" ref="name" type="text" label="Name" /><br/>
							<Input name="password" id="password" ref="password" type="password" label="Password" /><br/>
							<Button type="submit" label="Login" primary />
						</div>
					</form>
				</CardText>
			</Card>
    )
  }
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func
};

export default Login;