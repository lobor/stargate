
// import React, { Component } from 'react';
// import { Card, CardText, CardActions, CardTitle } from 'react-toolbox/lib/card';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FormLogin from './../../components/forms/user/login.jsx';

import { CardStyle, CardTitleStyle } from './style';
class Login extends React.Component {
  // render() {
  //   return (
	// 		<div></div>
  //   )
  // }
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
