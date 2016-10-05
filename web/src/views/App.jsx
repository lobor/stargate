import React, { Component } from 'react';
import Navigation from './../components/navigation/Navigation.jsx';

import { BrowserRouter, Match, Miss, Link } from 'react-router'

import { appCss } from './../style/app.scss';
var Api = require("imports?this=>window!./../utils/Api")


import Login from './login/Login';
import Home from './home/Home';
import Video from './video/Video';
import Config from './config/Config';
import PageNotFound from './PageNotFound';
import Detect from './detect/Detect';
import ModelFR from './facerecognition/Model';
import AddFR from './facerecognition/Add';


class App extends Component {
	constructor(){
		super();

		this.state = {
			routes: [
				{
					pattern: '/',
					component: Home
				},
				{
					pattern: '/video',
					component: Video
				},
				{
					pattern: '/config',
					component: Config
				},
				{
					pattern: '/config/facerecognition/add',
					component: AddFR
				},
				{
					pattern: '/config/facerecognition/model',
					component: ModelFR
				},
				{
					pattern: '/user/login',
					component: Login
				},
			]
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
				if(val){
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
				<div>
					<Navigation />
					<div className="wrapper">
						{this.state.routes.map((route, i)=>{
							return (<Match key={i} exactly pattern={route.pattern} component={route.component} />)
						})}
					</div>
				</div>
			</BrowserRouter>
		)
  }
  // render() {
  //   return (
	// 		<BrowserRouter>
	// 			<div>
	// 				<Navigation />
	// 				<div className="wrapper">
						// <Match exactly pattern="/" component={Home} />
						// <Match pattern="/video" component={Video} />
						// <Match pattern="/config" component={Config} />
						// <Match pattern="/config/facerecognition/add" component={AddFR} />
						// <Match pattern="/config/facerecognition/model" component={ModelFR} />
						// <Match pattern="/user/login" component={Login} />
	// 				</div>
	// 			</div>
	// 		</BrowserRouter>
	// 	)
  // }
}
//
// App.contextTypes = {
// 	router: React.PropTypes.object.isRequired,
// };

App.childContextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default App;
