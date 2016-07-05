import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import testcomponent from './../components/testcomponent.jsx';
import App from './../components/App.jsx';
import Login from './../components/Login.jsx';
import Home from './../components/Home.jsx';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} auth={['user']} />
			<Route path="testComponent" auth={['user']} component={testcomponent} />
			<Route path="user/" >
				<Route path="login" auth={['free']} component={Login} />
			</Route>
		</Route>
	</Router>
)