require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		ManagePlugin = require(basePath + '/core/managePlugin'),
		pluginManager;


// Load config
var ConfigEnv = require(basePath + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);


// Create instance of server
let server = new Server();

// The manager plugin is instancing, with several config, like the server for attach it, and the path of plugins


// Set plugin manager with server like dependencies on routes
server
	.set({pluginManager: pluginManager});

server.on('onStartServer', ()=>{
	pluginManager = new ManagePlugin({
		server: server,
		path: basePath + '/plugins/'
	});

	pluginManager.on('load:end', (data) => {
		server
			.setRoutes(data.routes)
			.setAssets(data.assets)
			.reloadRoutes()
			.reloadFront({add: data.add, delete: data.delete});
	});

	pluginManager.loadPlugin();
});


// start the server web
server.start();
