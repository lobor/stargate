/*jshint esnext:true, browserify:true */
'use strict';

import 'babel/polyfill';
import 'isomorphic-fetch';
import React, { Component } from 'react';
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory, match, Link } from 'react-router';
import routes from './config/routes.jsx';

// import testcomponent from './components/testcomponent.jsx';
// import App from './components/App.jsx';
// import Login from './components/Login.jsx';



// export var routes = (
// 	<Router history={browserHistory}>
// 		<Route path="/" component={App}>
// 			<IndexRoute component={Home} />
// 			<Route path="testComponent" component={testcomponent} />
// 			<Route path="user/">
// 				<Route path="login" component={Login} />
// 			</Route>
// 		</Route>
// 	</Router>
// )

if (typeof(document) !== "undefined") {
	render(routes, document.getElementById('container'))
}
