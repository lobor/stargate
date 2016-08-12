var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cachify = require('connect-cachify');
var ejs = require('ejs');
var exec = require('child_process').exec;
// var motion = require(process.cwd() + '/web/src/utils/motion');
var loadRoutes = require('./routes/load');
var proxy = require('express-http-proxy');

class Server{
	constructor(){
		this.config = {};

		// this.motion = new motion();
		// this.motion.setConfig(process.cwd() + '/config/motion/confcam.conf');

		this.server = express();


		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use('/assets', express.static('web/assets'));
		this.server.use('/video', express.static('visio/motion_detection'));

		// this.server.use('/video/cam', proxy('localhost:8081', {reqBodyEncoding: null}));

		this.initSession();
		this.initCache();
		this.initTemplate();

		// exec('ls /dev/video0', (error, stdout, stderr) => {
		// 	if(!error){
		// 		this.motion.start();
		// 		this.webcamRunning = true;
		// 	}
		// });
	}

	set(name, value){
		let key;
		if('object' === typeof name && undefined === value){
			for(key in name){
				this[key] = name[key];
			}
		}
		else{
			this[name] = value;
		}
		return this;
	}

	loadRoutes(){
		let i = 0, j, sizeAll = loadRoutes.length, sizeRoute, route, routes, dep;
		for(; i < sizeAll; i++){
			routes = loadRoutes[i];

			for(j = 0, sizeRoute = routes.length, dep = {}; j < sizeRoute; j++){
				route = routes[j];

				if(route.dep){
					route.dep.forEach((el) => {
						dep[el] = this[el];
					});
				}

				this.server[route.type](route.url, route.call.bind(dep));
			}
		}
		return this;
	}

	initTemplate(){
		this.server.set('view engine', 'ejs');
		this.server.set('views', 'web/src/views');
	}

	initCache(){
		let assets = {
			"/assets/app.min.js": [ "/assets/app.js" ]
		};

		this.server.use(cachify.setup(assets, {
			root: "./web/",
			production: (process.env.NODE_ENV != "development"),
		}));
	}

	initSession(){
		this.server.use(session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 600000 }
		}));

		this.server.use(function (req, res, next) {
			let sess = req.session;
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
	}

	start(){
		let http;
		if (process.env.NODE_ENV != "development"){
			let fs = require('fs'),
					options = {
						key  : fs.readFileSync('server.key'),
						cert : fs.readFileSync('server.crt')
					};
			http = require('https').createServer(options, this.server);
		}
		else{
			http = require('http').createServer(this.server);
		}

		http.listen(process.env.PORT || 8080, function () {
			console.log('Server is listening...');
		});
	}
}

export default Server;
