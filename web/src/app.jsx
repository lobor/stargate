// import 'babel/polyfill';
// import 'isomorphic-fetch';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, match, Link } from 'react-router';
import routes from './../../config/web/routes.jsx';
var Api = require("imports?this=>window!./utils/Api")
Api.run();
if (typeof(document) !== "undefined") {
	render(routes, document.getElementById('container'))
}

// window.socket = io.connect();
// socket.on('news', function (data) {
// 	console.log(data);
// 	socket.emit('my other event', { my: 'data' });
// });