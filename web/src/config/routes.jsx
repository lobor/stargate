import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import testcomponent from './../components/testcomponent';
import App from './../components/App';
import Login from './../components/Login';
import Home from './../components/Home';
import Video from './../components/Video';
import Config from './../components/Config';
import PageNotFound from './../components/PageNotFound';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} auth={['user']} />
			<Route path="testComponent" auth={['user']} component={testcomponent} />
			<Route path="video" auth={['user']} component={Video} />
			<Route path="config" auth={['user']} component={Config} />
			<Route path="user/" >
				<Route path="login" auth={['free']} component={Login} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Route>
	</Router>
)