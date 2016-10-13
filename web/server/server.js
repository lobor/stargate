/**
 * Class of server web
 */

var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		loadRoutes = require('./routes/load'),
		compression = require('compression'),
		defaultAssets = [
			'/web/assets/app.js',
		];


class Server{
	constructor(){
		this.data = {};
		this.event = {};
		this.server = express();

		this.server.set('view engine', 'ejs');

		this.server.use(compression());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use('/font', express.static('web/assets/font'));
		this.server.use('/css', express.static('web/assets'));
		this.server.use('/visio', express.static('visio/detect'));

		this.sessionMiddleware = session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 600000 }
		});

		this.assets = defaultAssets;

		this.routes = loadRoutes;

		/**
		 * test if production or developpement
		 * If production, load HTTPS
		 */
		// if (process.env.NODE_ENV != "development"){
		// 	let fs = require('fs'),
		// 			options = {
		// 				key  : fs.readFileSync('server.key'),
		// 				cert : fs.readFileSync('server.crt')
		// 			};
		// 	this.http = require('https').Server(options, this.server);
		// }
		// else{
			this.http = require('http').Server(this.server);
		// }
		this.io = require('socket.io')(this.http);
	}

	reloadFront(data){
		let nameSocket;
		if(data.add){
			nameSocket = 'assets:add';
		}
		else if (data.delete){
			nameSocket = 'assets:delete';
		}
		this.io.emit(nameSocket, data)
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

	setRoutes(routes){
		this.routes = loadRoutes;
		routes.forEach((route)=>{
			for(let key in route){
				this.routes[key] = route[key].concat(this.routes[key]);
			}
		});

	}

	setAssets(assets){
		this.assets = defaultAssets;
		// push asset on template
		assets.forEach((asset)=>{
			this.assets = this.assets.concat(asset);
		});
	}

	loadAssets(){
		this.assets.forEach((assets)=>{
			this.server.get(assets, (req, res) => {
				res.sendFile(process.cwd() + assets);
			});
		});
	}

	loadSocket(){
		let i = 0, j, size, sizeRoute, route, routes, dep;
		for(i = 0, size = this.routes.api.length; i < size; i++){
			routes = this.routes.api[i];

			for(j = 0, sizeRoute = routes.length, dep = {socket: this.socket}; j < sizeRoute; j++){
				route = routes[j];

				// search dependencies
				if(route.dep){
					route.dep.forEach((el) => {
						dep[el] = this[el];
					});
				}

				// attach socket route with dependencies
				this.socket.on(route.name, route.call.bind(dep));
			}
		}
	}

	loadRoutes(){
		let i = 0, j, size, sizeRoute, route, routes, dep;
		for(i = 0, size = this.routes.front.length; i < size; i++){
			routes = this.routes.front[i];

			for(j = 0, sizeRoute = routes.length, dep = {}; j < sizeRoute; j++){
				route = routes[j];

				// search dependencies
				if(route.dep){
					route.dep.forEach((el) => {
						dep[el] = this[el];
					});
				}

				// attach route with dependencies
				this.server[route.type](route.url, route.call.bind(dep));
			}
		}

		return this;
	}

	initSession(){
		this.server.use(this.sessionMiddleware);

		this.io.use((socket, next) => {
	    this.sessionMiddleware(socket.request, socket.request.res, next);
		});

		this.server.use((req, res, next) => {
			let sess = req.session;

			if ((sess.views && '/user/login' !== req.originalUrl) || (!sess.views && '/user/login' === req.originalUrl) || -1 !== this.assets.indexOf(req.originalUrl)) {
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

	on(name, cb) {
		this.event[name] = cb;
	}

	off(name) {
		this.event[name] = false;
	}

	emit(event, data) {
    let nameFunction = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
		if (this.event[nameFunction]) {
			this.event[nameFunction].call(undefined, data);
		}
	}

	reloadRoutes(){
		this.server._router.stack = this.server._router.stack.filter((stack, index)=>{
			return !stack.route;
		});

		this.initSession();
		this.loadAssets();
		this.loadRoutes();

		this.emit('reloadServer');

		return this;
	}

	start(){
		this.initSession();

		this.loadAssets();
		this.loadRoutes();

		this.isStart = true;
		this.http.listen(process.env.PORT || 8080, () => {
			console.log('Server is listening...');
		});

		this.io.on('connection', (socket) => {
			this.socket = socket;
			this.loadSocket();
		});
	}
}

export default Server;
