var fs = require('fs');
var https = require('https');

import { warning, success, error, info} from './../'

export default class PluginsManager{
  constructor(config){
    this.config = config || {};
    this.dbPlugins = {};

    this.event = {};

    this.plugins = {};

    return this;
  }

  getPlugin(name){
    return this.plugins[name];
  }

  updateDB(){
    let flagState = false;
    try {
      fs.accessSync(this.config.pathProcess + '/tmp/update.json', fs.F_OK);
    } catch (e) {
      flagState = true;
    }

    getFileUpdatePlugin((data) => {
      if(flagState){
        fs.writeFileSync(this.config.pathProcess + '/tmp/update.json', data)
      }

      let update = require(this.config.pathProcess + '/tmp/update.json');
      Object.assign(this.dbPlugins, update, JSON.parse(data));
    });

    return this;
  }

  loadPlugins(path){
    let plugins = fs.readdirSync(this.config.pathProcess + path);

    for(let plugin of plugins){
      this.add(this.config.pathProcess + path + '/' + plugin)
    }
  }

  add(plugin){
    plugin = require(plugin);
    plugin = new plugin();

    plugin.load();

    if(plugin.install){
      plugin.install();
    }

    this.plugins[plugin.props.conf.name] = plugin;
  }

  installPlugin(){

  }

  delete(name){
    delete this.plugins[name];
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

function getFileUpdatePlugin(cb){
  var that = this;
  var request = https.get({hostname: "raw.githubusercontent.com", header: {'Content-Type': 'application/json'}, path: "/lobor/stargate/update/update.json"}, function(res) {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      cb(chunk)
    });
  });
}
