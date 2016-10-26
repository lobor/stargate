import routesSocket from "./routes/API";
import routesFront from "./routes/front";

var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		compression = require('compression'),
		http = require('http'),
		socketIo = require('socket.io');



export default class Server{
	constructor(){
		this.event = {};
		this.data = {};
		this.routes = routesFront,
		this.routesSocket = routesSocket;
		this.assets = [
			'/web/assets/app.js',
		];

		this.server = express();
		this.server.set('view engine', 'ejs');
		this.server.use(compression());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use('/font', express.static('web/assets/font'));
		this.server.use('/css', express.static('web/assets'));

		this.http = http.Server(this.server);
		this.io = socketIo(this.http);
	}

	addRoute(route){
		route = this.setDependencies(route);
		this.server[route.type](route.url, route.call);
	}

	addRouteSocket(route){
		let copyRoute = Object.assign({}, route);
		copyRoute = this.setDependencies(copyRoute);
		this.socket.on(copyRoute.name, copyRoute.call);
	}

	removeRoutes(){

	}

	removeRoutesSocket(){

	}

	routesAssets(){
		this.assets.forEach((assets)=>{
			this.addRoute({
				type: 'get',
				url: assets,
				call: (req, res) => {
					res.sendFile(process.cwd() + assets);
				}
			})
		});
	}

	setDependencies(route){
		let dep = {};
		if(route.require){
			route.require.forEach((el) => {
				dep[el] = this[el];
			});
		}
		route.call = route.call.bind(dep);
		return route;
	}

	loadRoutes(){
		for(let routesName in this.routes){
			for(let route of this.routes[routesName]){
				this.addRoute(route)
			}
		}
		return this;
	}

	loadRoutesSocket(){
		for(let routesName in this.routesSocket){
			for(let route of this.routesSocket[routesName]){
				this.addRouteSocket(route)
			}
		}

		return this;
	}

	start(){
		this.routesAssets();
		this.loadRoutes();

		this.http.listen(process.env.PORT || 8080, () => {
			console.log('Server is listening...');
		});

		this.io.on('connection', (socket) => {
			console.log('Socket is connected...');
			this.socket = socket;
			this.emit('socketLoad');
			this.loadRoutesSocket();
		});
	}

	stop(){

	}

	update(){

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
