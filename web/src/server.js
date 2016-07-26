/*jshint node:true */
'use strict';

// Start by registering a hook that makes calls to `require` run ES6 code
// This will be the only file where JSX and ES6 features are not supported
require('babel/register');

var https = require('https');
var express = require('express');
var cachify = require('connect-cachify');
var ejs = require('ejs');
var server = express();

// var routes = require("./config/routes.jsx");
var bodyParser = require('body-parser');
var session = require('express-session');

var motion = require('./utils/motion');
motion = new motion();
motion.setConfig(process.cwd() + '/confcam.conf');


var ConfigEnv = require('./config/environnement');
var ConfigAdmin = require('./config/admin');
Object.assign(process.env, ConfigEnv);

// List of assets where the keys are your production urls, and the value
// is a  list of development urls that produce the same asset
var assets = {
  "/assets/app.min.js": [ "/assets/app.js" ]
};


var exec = require('child_process').exec,
		webcamConnect = false,
		webcamRunning = false;

exec('lsusb', function(error, stdout, stderr){
	webcamConnect = /(cam|webcam)/g.test(stdout);
	if(webcamConnect){
		motion.start();
		webcamRunning = true;
	}
});

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

server.use(function (req, res, next) {
	var sess = req.session;
  if ((sess.views && '/user/login' !== req.originalUrl) || (!sess.views && '/user/login' === req.originalUrl)) {
		next();
  } 
	else if(sess.views && '/user/login' === req.originalUrl){
		res.redirect('/');
	}
	else {
    sess.views = false;
		if(req.xhr || req.headers.accept.indexOf('json') > -1){
			res
				.status(401)
				.json({
					"response":false,
					"errors": {
						"message": "You should be connected for to have access",
						"redirect":"/user/login"
					}
				});
		}
		else{
			res.redirect('/user/login');
		}
  }
});


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
	sess.destroy(function(){
		res.status(200).json({
			"response":true
		});
	});
});


server.post('/api/config', function(req, res) {
	if(req.body.name && undefined !== req.body.value){
		switch (req.body.name) {
			case 'webcam':
				if(req.body.value){
					motion.start();
					webcamRunning = true;
				}
				else if(webcamRunning){
					motion.stop();
					webcamRunning = false;
				}
				break;
		}
		res.status(200).json({
			"response": {
				'webcam': {
					'stream': webcamRunning,
					'connect': webcamConnect
				}
			},
		});
	}
	else{
		res.status(500).json({
			"response":false,
			"errors": {
				"message": "You should be connected for to have access",
				"redirect":"/user/login"
			}
		});
	}
});


server.get('/api/config', function(req, res) {
	res.status(200).json({
		"response": {
			'webcam': {
				'stream': webcamRunning,
				'connect': webcamConnect
			}
		},
	});
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


server.get('*', function(req, res) {
		res.render('template', {
			output: ''
		});
});


var http;
if (process.env.NODE_ENV != "development"){
	var fs = require('fs');

	var options = {
		key  : fs.readFileSync('server.key'),
		cert : fs.readFileSync('server.crt')
	};
	http = require('https').createServer(options, server);
}
else{
	http = require('http').createServer(server);
}

http.listen(process.env.PORT || 8080, function () {
   console.log('Server is listening...');
});
