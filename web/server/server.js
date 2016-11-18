import routesSocket from "./routes/API";
import routesFront from "./routes/front";

import { info } from "./../../core/console";
import db from "./../../core/db";

var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		compression = require('compression'),
		http = require('http'),
		socketIo = require('socket.io');



export default class Server{
	constructor(){
		this.event = {};
		this.db = db(process.cwd() + '/db');
		this.routes = routesFront,
		this.routesSocket = routesSocket;
		this.assets = [
			'/web/assets/app.js',
			'/web/assets/app.js.map'
		];

		this.server = express();
		this.server.set('view engine', 'ejs');
		this.server.use(compression());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use('/font', express.static('web/assets/font'));
		this.server.use('/css', express.static('web/assets'));

		this.http = http.Server(this.server);
		this.io = socketIo.listen(this.http);


		this.sessionMiddleware = session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 600000 }
		});

		this.server.use(this.sessionMiddleware);

		this.io.use((socket, next) => {
	    this.sessionMiddleware(socket.request, socket.request.res || {}, next);
		});


		this.server.use((req, res, next) => {
			let sess = req.session;
			if(req.hostname === 'localhost'){
				sess.user = true;
		    sess.save();
				next();
			}
			else{
				if ((sess.user && '/user/login' !== req.path) || (!sess.user && '/user/login' === req.path) || -1 !== this.assets.indexOf(req.path)) {
					next();
				}
				else if(sess.user && '/user/login' === req.path){
					res.redirect('/');
				}
				else {
					sess.user = false;
					res.redirect('/user/login' + (('/user/login' !== req.path && req.path !== '/') ? '?redirect=' + req.path : ''));
				}
			}
		});
	}


	/**
	 * Set dependencies on server
	 */
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

	/**
	 * Add route
	 */
	addRoute(route){
		route = this.setDependencies(route);
		this.server[route.type](route.url, route.call);
	}

	/**
	 * Add socket route
	 */
	addRouteSocket(route){
		let copyRoute = Object.assign({}, route);
		copyRoute = this.setDependencies(copyRoute);
		this.socket.on(copyRoute.name, (data, fc) => {
			if(this.socket.request.session.user){
				copyRoute.call(data, fc);
			}
			else{
				fc({
					error: 403
				})
			}
		});
	}


	/**
	 * Create route for assets
	 */
	routesAssets(){
		this.assets.forEach((assets)=>{
			this.addRoute({
				type: 'get',
				url: assets,
				call: (req, res) => {
					res.sendFile(process.cwd() + assets);
				}
			});
		});
	}


	/**
	 * Set dependencies of routes
	 */
	setDependencies(route){
		let dep = {};
		if(route.require){
			route.require.forEach((el) => {
				dep[el] = this[el];
			});
		}

		if(route.dependencies){
			dep = route.dependencies;
		}
		route.call = route.call.bind(dep);
		return route;
	}


	/**
	 * Load route of app stargate
	 */
	loadRoutes(){
		for(let routesName in this.routes){
			for(let route of this.routes[routesName]){
				this.addRoute(route)
			}
		}
		return this;
	}

	/**
	 * Remove assets
	 */
	removeAssets(assetToDelete){
		this.assets = this.assets.filter((asset)=>{
			return asset !== assetToDelete;
		});
	}


	/**
	 * Load socket route of app stargate
	 */
	loadRoutesSocket(){
		this.emit('socketLoad');
		for(let routesName in this.routesSocket){
			for(let route of this.routesSocket[routesName]){
				this.addRouteSocket(route)
			}
		}

		return this;
	}


	/**
	 * Load routes front and socket of server
	 */
	loadRoutesServer(){
		this.routesAssets();
		this.loadRoutes();
	}


	/**
	 * start server web and socket
	 */
	start(){
		this.loadRoutesServer();

		this.http.listen(process.env.PORT || 8080, () => {
			info('Server is listening...');
		});

		this.io.on('connection', (socket) => {
			info('Socket is connected...');

			this.socket = socket;

			if(socket.request.session.user || socket.request.hostname === 'localhost'){
				this.emit('socketLoad');
				this.loadRoutesSocket();
			}
			else{
				this.socket.on('login', require('./login').bind(this));
			}
		});
	}


	/**
	 * Stop server web
	 * Clear routes
	 */
	stop(){
		// this.http.close();
		this.server._router.stack = this.server._router.stack.filter((stack, index)=>{
			return !stack.route;
		});
	}



/**
 * System event on server
 */
	on(name, cb) {
		if(!this.event[name]){
			this.event[name] = [];
		}
		this.event[name].push(cb);
	}

	off(name) {
		this.event[name] = false;
	}

	emit(event, data) {
		if (this.event[event] && this.event[event].length) {
			this.event[event].forEach((cb) => {
				cb.call(undefined, data)
			})
			// this.event[nameFunction].call(undefined, data);
		}
	}
}
