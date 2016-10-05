// import 'babel/polyfill';
// import 'isomorphic-fetch';
import React, { Component } from 'react';
import { render } from 'react-dom';
// import routes from './../../config/web/routes.jsx';
import App from './views/App.jsx';

if (typeof document !== "undefined") {
	window.App = render(<App />, document.getElementById('container'));
}
// var socket = io.connect();
// socket.emit('login');
// window.socket = io.connect();
// socket.emit('login');
