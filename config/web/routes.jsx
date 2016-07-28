import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';


import App from './../../web/src/components/App';
import Login from './../../web/src/components/Login';
import Home from './../../web/src/components/Home';
import Video from './../../web/src/components/Video';
import Config from './../../web/src/components/Config';
import PageNotFound from './../../web/src/components/PageNotFound';
import Detect from './../../web/src/components/Detect';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} auth={['user']} />
			<Route path="video" auth={['user']} component={Video} />
			<Route path="video/detect" auth={['user']} component={Detect} />
			<Route path="config" auth={['user']} component={Config} />
			<Route path="user/" >
				<Route path="login" auth={['free']} component={Login} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Route>
	</Router>
)