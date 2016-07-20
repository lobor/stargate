/*jshint node:true */
'use strict';

// Start by registering a hook that makes calls to `require` run ES6 code
// This will be the only file where JSX and ES6 features are not supported
require('babel/register');

var React = require('react');
var Router = require('react-router');
var express = require('express');
var cachify = require('connect-cachify');
var ejs = require('ejs');
var server = express();
var srv = require('react-dom/server');
// var routes = require("./config/routes.jsx");
var bodyParser = require('body-parser');
var session = require('express-session');

var ConfigEnv = require('./config/environnement');
var ConfigAdmin = require('./config/admin');
Object.assign(process.env, ConfigEnv);

// List of assets where the keys are your production urls, and the value
// is a  list of development urls that produce the same asset
var assets = {
  "/assets/app.min.js": [ "/assets/app.js" ]
};

server.use(session({
  secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));

// Enable browser cache and HTTP caching (cache busting, etc.)
server.use(cachify.setup(assets, {
  root: "./web/",
  production: (process.env.NODE_ENV != "development"),
}));


// configure app to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/assets', express.static('web/assets'));

server.set('view engine', 'ejs');
server.set('views', 'web/src/views');




server.post('/user/login', function(req, res){
	if(req.body.name == ConfigAdmin.user && req.body.password == ConfigAdmin.password){
		var sess = req.session;
		sess.views = true;
		res.status(200).json({
			"response":true
		});
	}
	else{
		res.status(403).json({
			"response":false,
			"errors": {
				"message": "Is not good user name or password"
			}
		});
	}
});

server.get('/user/logout', function(req, res){
	var sess = req.session;
	if(sess.views){
		sess.destroy(function(){
			res.status(200).json({
				"response":true
			});
		});
	}
	else{
		res.status(401).json({
			"response":false,
			"errors": {
				"message": "You should be connected for to have access",
				"redirect":"/user/login"
			}
		});
	}
});


server.get('/webcam.mp4', function(req, res) {
	var sess = req.session;
	if(sess.views){
		
		res.status(404).json({
			"response":false,
			"errors": {
				"message": "Stream not activate"
			}
		});

	}
	else{
		res.status(401).json({
			"response":false,
			"errors": {
				"message": "You should be connected for to have access",
				"redirect":"/user/login"
			}
		});
	}
});


// Redirect the user to the list of native components for iOS
server.get('*', function(req, res) {
	
	var sess = req.session;
  if ((sess.views && '/user/login' !== req.originalUrl) || (!sess.views && '/user/login' === req.originalUrl)) {
		res.render('template', {
			output: ''
		});
  } 
	else if(sess.views && '/user/login' === req.originalUrl){
		res.redirect('/');
	}
	else {
    sess.views = false;
		res.redirect('/user/login');
  }


	// var Router2 = React.createFactory(Router.RouterContext);
	// Router.match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
	// 	// console.log(redirectLocation);
  //   if (error) {
  //     res.status(500).send(error.message);
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
	// 		// console.log(renderProps);
	// 		res.render('template', {
  //     	output: ''
  //     	// output: srv.renderToString(Router2(renderProps))
  //   	});
			
  //   } else {
  //     res.status(404).send('Not found');
  //   }
  // });
});

// Listen for connections
server.listen(process.env.PORT || 8080, function() {
  console.log('Server is listening...');
});
