import React from 'react';
import { render } from 'react-dom';
// import { Router, IndexRoute, Route, browserHistory, Routes } from 'react-router';

import { BrowserRouter, Match, Miss, Link } from 'react-router'


// import App from './../../web/src/views/App';
// import Login from './../../web/src/views/login/Login';
// import Home from './../../web/src/views/home/Home';
// import Video from './../../web/src/views/video/Video';
// import Config from './../../web/src/views/config/Config';
// import PageNotFound from './../../web/src/views/PageNotFound';
// import Detect from './../../web/src/views/detect/Detect';
// import ModelFR from './../../web/src/views/facerecognition/Model';
// import AddFR from './../../web/src/views/facerecognition/Add';

// class Toto extends React.Component{
// 	render(){
// 		return (
// 			// <BrowserRouter basename="/motion">
// 				// <Match pattern="/tata" component={Tata} />
// 			// </BrowserRouter>
// 		);
// 	}
// }

class Tata extends React.Component{
	render(){
		return (<div>tata</div>);
	}
}

console.log(window.App);
var routes = window.App.state.routes;
routes.push({
	pattern: '/motion',
	component: Tata
});



window.App.setState({routes:routes})



// import React, { Component } from 'react';
// import { render } from 'react-dom';
// // import routes from './../../config/web/routes.jsx';
// import App from './views/App.jsx';

// if (typeof document !== "undefined") {
// 	render(<Toto />, document.querySelector('.wrapper'))
// }

// var routes = (
// 	<Routes path="/motion" component={Toto}>
// 		<Route path="config" component={Toto} />
// 	</Routes>
// )
//
// if (typeof document !== "undefined") {
// 	render(routes, document.querySelector('.wrapper'))
// }
