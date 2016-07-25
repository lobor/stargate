
import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardActions, CardTitle } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import FontIcon from 'react-toolbox/lib/font_icon';

class Login extends Component {
	constructor(...args){
		super(...args);
		this.state = {msg: false, name: false, password: false};
	}

	submit(e){
		e.preventDefault();
		this.setState({msg: false})
		axios
			.post('/user/login', {
				name: this.state.name,
				password: this.state.password
			})
			.then(function (response) {
				this.context.auth(true);
				this.context.router.push('/');
			}.bind(this))
			.catch(function (error) {
				this.setState({msg: error.data.errors.message})
			}.bind(this));
	}

	change(name, value){
		this.setState({[name]: value});
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
							<Input name="name" id="name" type="text" required label="Name" onChange={this.change.bind(this, 'name')} /><br/>
							<Input name="password" id="password" required type="password" label="Password"  onChange={this.change.bind(this, 'password')} /><br/>
							<div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >
								<FontIcon value='error' />
								{this.state.msg}
							</div>
							<Button type="submit" label="Login" raised primary />
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