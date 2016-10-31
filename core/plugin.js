/**
 * Base Class of plugins whend laod on server
 */

var spawn = require('child_process').spawn;
import { success, error, warning } from './console';
var fs = require('fs');

var pathConfig = '/tmp/config.js';
var rootPath = process.cwd();
var pathPlugin = rootPath  + '/plugins/';

class Plugin {
	constructor() {
    this.event = {};

		// Check if config file is in tmp directory, if not create it
		let pluginName = this.props.conf.name.toLowerCase();

		try {
		  fs.accessSync(pathPlugin + pluginName + '/tmp', fs.F_OK);
		} catch (e) {
			fs.mkdirSync(pathPlugin + pluginName + '/tmp', '0777');
		}

		try {
		  fs.accessSync(pathPlugin + pluginName + pathConfig, fs.F_OK);
		} catch (e) {

		  let cpConf = spawn('cp', [pathPlugin + pluginName + '/config/config.js', pathPlugin + pluginName + pathConfig]);

		  cpConf.stderr.on('data', (data) => {
		    error('Copy config', data.toString('utf-8'));
		  });

		  cpConf.on('close', (code) => {
		    if(code === 0){
					this.props.conf = require(pathPlugin + pluginName + pathConfig);
		      success('Copy config');
		    }
		  });
		}

		// Hack because node is launch on sudo
		spawn('chmod', ['0777', pathPlugin + pluginName + '/front/assets/' + pluginName + '.js']);

		return this;
	}

	/**
	 * Load file on plugin system, back routes and front routes
	 */
	load(){
		let className = this.props.conf.name;
	  let pathBack = pathPlugin + className.toLowerCase() + '/back/';
	  let pathFront = pathPlugin + className.toLowerCase() + '/front/';

		// Load back route and set route of config menu
	  try{
			Object.assign(this, require(pathBack))

			// create route get config
			this.routes.api.push({
				name: className + ':config',
				depPlugin: [],
				call: (data, fc) => {
					fc(this.props.conf);
				}
			});

			// create route post config
			this.routes.api.push({
				name: className + ':config:post',
				depPlugin: [],
				call: (data, fc) => {
					this.props.conf[this.props.conf.name] = data;
					this.setConfig(this.props.conf);
					this.emit('load');
					fc(this.props.conf);
				}
			});
	  }
	  catch (e){
	    warning(className, 'Cannot find module:', pathBack, '\n', e, '\n');
	  }

	  try{
			Object.assign(this, require(pathFront))
	  }
	  catch (e){
	    warning(className, 'Cannot find module:', pathFront, '\n', e, '\n');
	  }


		// Emit load event
		this.emit('load');
	}

	// loadDependencies(){
	// 	this.routes.api.forEach((apiRoute, indexRouteApi) => {
	// 		apiRoute.forEach((route, indexRoute) => {
	// 			let dep = {};
	// 			// search dependencies
	// 			if(route.depPlugin && route.depPlugin.length){
	// 				route.depPlugin.forEach((el) => {
	// 					dep[el] = this[el];
	// 				});
	// 			}
	//
	// 			// attach route with dependencies
	// 			route.dependencies = dep;
	// 		});
  //   });
	// }

	remove(){
		this.event = {};
	}

  setConfig(conf){
    if(typeof conf === 'object'){
      let path = pathPlugin + this.props.conf.name + pathConfig;
      fs.writeFile(path, 'module.exports = ' + JSON.stringify(conf) + ';', 'utf8', (err) => {
        if(err){
          error(this.props.conf.name, 'Impossible to write:', path);
        }
        else{
          success(this.props.conf.name, 'Write file:', path);
          this.config = conf;
        }
        this.emit('config', err);
      });
    }
    else{
      error(this.props.conf.name, 'the param should be an object');
    }
  }

  setDependencies(deps){
    if(typeof deps === 'object'){
      this.dependencies = deps;
      this.emit('dependencies');
    }
    else{
      error(this.props.conf.name, 'the param should be an object');
    }
  }

	serverStart(){
		this.emit('serverStart');
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
};

export default Plugin;
