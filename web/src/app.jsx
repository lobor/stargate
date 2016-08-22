// import 'babel/polyfill';
// import 'isomorphic-fetch';
import { render } from 'react-dom';
import routes from './../../config/web/routes.jsx';

if (typeof(document) !== "undefined") {
	render(routes, document.getElementById('container'))
}
// var socket = io.connect();
// socket.emit('login');
// window.socket = io.connect();
// socket.emit('login');
