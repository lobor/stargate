/*jshint esnext:true, browserify:true */
'use strict';

import 'babel/polyfill';
import 'isomorphic-fetch';
import React from 'react/addons';
import Router from 'react-router';

import testcomponent from './components/testcomponent.jsx';
import App from './components/App.jsx';

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

export var routes = (
	<Route name="app">
  	<Route path="/" handler={App} />
		<Route path="/testComponent" handler={testcomponent} />
	</Route>
)

if (typeof(document) !== "undefined") {
  Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    React.render(
      <Handler {...state} />,
      document.getElementById("container")
    );
  });
}

