require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		fs = require('fs'),
		ManagePlugin = require(basePath + '/core/managePlugin');


// Load config
var ConfigEnv = require(basePath + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);


// Create instance of server
let server = new Server();

// The manager plugin is instancing, with several config, like the server for attach it, and the path of plugins
var pluginManager = new ManagePlugin({
	server: server,
	path: basePath + '/plugins/'
});

// Set plugin manager with server like dependencies on routes
server
	.set({pluginManager: pluginManager});


// When plugin manager has been finished to load plugins, attach routes and assets on server
// then reload it
pluginManager.on('load:end', (data) => {
	server.setRoutes(data.routes);
	server.setAssets(data.assets);
	server
		.reloadRoutes()
		.reloadFront({add: data.add, delete: data.delete});
});

// list all plugins, and send it on plugin manager
pluginManager.add(fs.readdirSync(pluginManager.path));

// attache dependencies of plugins
pluginManager.dependencies();


// start the server web
server.start();
