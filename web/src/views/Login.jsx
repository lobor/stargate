
import React, { Component } from 'react';
import { Card, CardText, CardActions, CardTitle } from 'react-toolbox/lib/card';
import FormLogin from './../components/forms/user/login.jsx';

class Login extends Component {

  render() {
    return (
			<Card style={{width: '100%', 'maxWidth': '350px', margin: 'auto'}}>
				<CardTitle
					title="Login"
					style={{"textAlign":"center"}}
				/>
				<CardText>
					<FormLogin />
				</CardText>
			</Card>
    )
  }
}


export default Login;
