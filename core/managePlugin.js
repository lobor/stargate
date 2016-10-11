var basePath = process.cwd();

class ManagePlugin{
  constructor(config){
    this.server = config.server;
    this.path = config.path;
    this.event = {};
    this.plugins = []
  }

  add(plugins){
    var nbPassage = 0,
    routes = [],
    assets = [],
    addPlugin = [];

    this.plugins.forEach((plugin)=>{
      routes = routes.concat(plugin.back.routes);
      assets = assets.concat(plugin.front.assets);
    });

    plugins.forEach((plugin) => {
      let plugin = require(this.path + plugin);

  		plugin = new plugin();
  		plugin.on('back', () => {
        routes = routes.concat(plugin.back.routes)
  			// this.server.setRoutes(plugin.back.routes);
  		});

  		plugin.on('front', () => {
  			if(plugin.front.assets !== ''){
          addPlugin.push(plugin.front.assets);
          assets = assets.concat(plugin.front.assets);
  				// this.server.setAssets(plugin.front.assets);
  			}
  			nbPassage++;
  		});

  		plugin
        .loadConfig()
  			.loadBack()
  			.loadFront();

      this.plugins.push(plugin);
    });

    if(nbPassage === plugins.length){
      // this.server.delete
      this.emit('load:end', {routes: routes, assets: assets, add: addPlugin});
    }
  }

  on(name, cb) {
		this.event[name] = cb;
	}

	off(name) {
		this.event[name] = false;
	}

	emit(event, data) {
    let nameFunction = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    if(typeof this[nameFunction] === 'function'){
      this[nameFunction](data);
    }
		if (this.event[event]) {
			this.event[event].call(undefined, data);
		}
	}

  delete(namePlugin){
    var routes = [],
    assets = [],
    delPlugin;

    this.plugins = this.plugins.filter((plugin)=>{
      if(plugin.constructor.name.toLowerCase() === namePlugin){
        delPlugin = plugin.front.assets;
        return false
      }

      routes = routes.concat(plugin.back.routes);
      assets = assets.concat(plugin.front.assets);

      return true;
    });

    this.emit('load:end', {routes: routes, assets: assets, delete: delPlugin});
  }

  // load dependencies of plugins
  dependencies(){
    for(let key in this.plugins){
    	let plugin = this.plugins[key],
    	 		dependencies = {};
    	for(let keyDep in plugin.props){
    		dependencies[keyDep] = this.plugins[plugin.props[keyDep]];
    	}
    	plugin.setDependencies(dependencies);
    }
  }
}


export default ManagePlugin;
