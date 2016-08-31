
import React, { Component } from 'react';
import { Card, CardText, CardActions, CardTitle } from 'react-toolbox/lib/card';
import FormLogin from './../../components/forms/user/login.jsx';

import { CardStyle, CardTitleStyle } from './style';

class Login extends Component {

  render() {
    return (
			<Card style={CardStyle}>
				<CardTitle
					title="Login"
					style={CardTitleStyle}
				/>
				<CardText>
					<FormLogin />
				</CardText>
			</Card>
    )
  }
}


export default Login;
