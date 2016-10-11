var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var exec = require('child_process').exec;
var loadRoutes = require('./routes/load');
var compression = require('compression');

var defaultAssets = [
	'/web/assets/app.js',
];


class Server{
	constructor(){
		this.config = {};
		this.data = {};

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
		})

	}

	setAssets(assets){
		this.assets = defaultAssets;
		// push asset on template
		assets.forEach((asset)=>{
			this.assets = this.assets.concat(asset);
		})
	}

	loadAssets(){
		this.assets.forEach((assets)=>{
			this.server.get(assets, (req, res) => {
				res.sendFile(process.cwd() + assets);
			});
		})
	}

	loadSocket(socket){
		let i = 0, j, size, sizeRoute, route, routes, dep;
		for(i = 0, size = this.routes.api.length; i < size; i++){
			routes = this.routes.api[i];

			for(j = 0, sizeRoute = routes.length, dep = {socket:socket}; j < sizeRoute; j++){
				route = routes[j];

				// search dependencies
				if(route.dep){
					route.dep.forEach((el) => {
						dep[el] = this[el];
					});
				}

				// attache socket route with dependencies
				socket.on(route.name, route.call.bind(dep));
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

				// attache route with dependencies
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

	reloadRoutes(){
		// var toto = this.server._router.stack;
		this.server._router.stack = this.server._router.stack.filter((stack, index)=>{
			return !stack.route;
		});




		// this.server._router.stack = [];
		// this.assets = defaultAssets;
		this.initSession();
		this.loadAssets();
		this.loadRoutes();
		// this.server._router.stack.forEach((stack)=>{
		// 	console.log(stack);
		// });
		// console.log(this.server._router);
		// this.server._router.stack.forEach((stack)=>{
		// 	console.log(stack);
		// });

		return this;
	}

	start(){


		this.initSession();

		this.loadAssets();
		this.loadRoutes();

		this.isStart = true;
		this.http.listen(process.env.PORT || 8080, () => {
			console.log('Server is listening...');


			// this.server._router.stack.forEach((stack) => {
			// 	if(stack.route)
			// 	console.log(stack.route.path);
			// })
		});

		this.io.on('connection', (socket) => {
			this.socket = socket;
			this.loadSocket(socket);
		});
	}
}

export default Server;
