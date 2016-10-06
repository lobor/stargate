// import React, { Component } from 'react';
import Navigation from './../components/navigation/Navigation.jsx';

import { BrowserRouter, Match, Miss, Link } from 'react-router'

import { appCss } from './../style/app.scss';

var Api = require("imports?this=>window!./../utils/Api")
var Menu = require('./../collections/menu');
import Login from './login/Login';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
  },
  appBar: {
    height: 50,
  },
});

import Home from './home/Home';
import Video from './video/Video';
import Config from './config/Config';
import PageNotFound from './PageNotFound';
import Detect from './detect/Detect';
import ModelFR from './facerecognition/Model';
import AddFR from './facerecognition/Add';


class App extends React.Component {
	constructor(){
		super();

		this.state = {
			routes: [
				{
					pattern: '/',
					component: Home,
					name: 'home'
				},
				{
					pattern: '/video',
					component: Video,
					name: 'video'
				},
				{
					pattern: '/config',
					component: Config,
					name: 'config'
				},
				{
					pattern: '/config/facerecognition/add',
					component: AddFR,
					name: 'home'
				},
				{
					pattern: '/config/facerecognition/model',
					component: ModelFR,
					name: 'home'
				},
				{
					pattern: '/user/login',
					component: Login,
					name: 'login'
				},
			],
			navigation: Menu
		}
	}

	getChildContext() {
		var auth = false;
		if('/user/login' !== window.location.pathname){
			auth = true;
		}
		else if('/user/login' === window.location.pathname){
			auth = false;
		}
    return {
      auth: (val) => {
				if(val !== undefined){
					auth = val;
				}
				return auth;
			},
			io: Api
    };
  }



  render() {
    return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div>
						<Navigation navigation={this.state.navigation} />
						<div className="wrapper">
							{this.state.routes.map((route, i)=>{
								return (<Match key={i} ref={route.name} exactly pattern={route.pattern} component={route.component} />)
							})}
						</div>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		)
  }
}

App.childContextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default App;
