import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';


import App from './../../web/src/views/App';
import Login from './../../web/src/views/login/Login';
import Home from './../../web/src/views/home/Home';
import Video from './../../web/src/views/video/Video';
import Config from './../../web/src/views/config/Config';
import PageNotFound from './../../web/src/views/PageNotFound';
import Detect from './../../web/src/views/detect/Detect';
import ModelFR from './../../web/src/views/facerecognition/Model';
import AddFR from './../../web/src/views/facerecognition/Add';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} auth={['user']} />
			<Route path="video" auth={['user']} component={Video} />
			<Route path="video/detect" auth={['user']} component={Detect} />
			<Route path="config">
				<IndexRoute component={Config} />
				<Route path="facerecognition">
					<Route path="add" component={AddFR} />
					<Route path="model" component={ModelFR} />
				</Route>
			</Route>
			<Route path="user/" >
				<Route path="login" auth={['free']} component={Login} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Route>
	</Router>
)
