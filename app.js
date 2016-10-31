require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		ManagePlugin = require(basePath + '/core/manager/pluginsManager'),
		pluginManager, server;

var fs = require('fs');

// Load config
var ConfigEnv = require(basePath + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);



pluginManager = new ManagePlugin({pathProcess: basePath});
pluginManager
	.updateDB()
	.loadPlugins('/plugins');


server = new Server();

// load plugin routes
loadRouteOnServer(pluginManager.plugins);


/**
 * add plugin
 */
pluginManager.on('addPlugin', (pluginName) => {
	// Get plugin
	let plugin = pluginManager.getPlugin(pluginName);

	// send to front asset to add
	server.io.emit('assets:add', plugin.assets)

	// stop server for add routes of plugins
	server.stop();
	loadRouteOnServer(pluginManager.plugins);

	// reload routes server
	server.loadRoutesServer();
});



/**
 * Delete plugins
 */
pluginManager.on('deletePlugin', (assets) => {

	// send to front the asset to delete
	server.io.emit('assets:delete', assets)

	// stop server for add routes
	server.stop();
	loadRouteOnServer(pluginManager.plugins);

	// delete assets
	server.removeAssets(assets);

	// reload routes server
	server.loadRoutesServer();
})


server.set({pluginManager: pluginManager})
server.start();


function loadRouteOnServer(plugins){
	for(let pluginName in plugins){
		let plugin = plugins[pluginName];
		server.on('socketLoad', ()=>{
			for(let routeSocket of plugin.routes.api){
				server.addRouteSocket(routeSocket);
			}
		})

		for(let route of plugin.routes.front){
			server.addRoute(route);
		}

		if(-1 === server.assets.indexOf(plugin.assets))
			server.assets.push(plugin.assets);
	}
}
