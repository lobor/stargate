import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import testcomponent from './../components/testcomponent.jsx';
import App from './../components/App.jsx';
import Login from './../components/Login.jsx';
import Home from './../components/Home.jsx';
import Video from './../components/Video.jsx';
import PageNotFound from './../components/PageNotFound.jsx';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} auth={['user']} />
			<Route path="testComponent" auth={['user']} component={testcomponent} />
			<Route path="video" auth={['user']} component={Video} />
			<Route path="user/" >
				<Route path="login" auth={['free']} component={Login} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Route>
	</Router>
)