// import 'babel/polyfill';
// import 'isomorphic-fetch';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, match, Link } from 'react-router';
import routes from './../../config/web/routes.jsx';


if (typeof(document) !== "undefined") {
	render(routes, document.getElementById('container'))
}
