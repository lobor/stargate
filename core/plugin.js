/**
 * Base Class of plugins whend laod on server
 */


import { success, error, warning } from './console';
var fs = require('fs');

var pathConfig = '/config/config.js';
var rootPath = process.cwd();
var pathPlugin = rootPath  + '/plugins/';

class Plugin {
	constructor() {
    this.event = {};
		this.back = {};
		this.front = {};

		return this;
	}

	load(){
		let className = this.props.conf.name;
	  let pathBack = pathPlugin + className.toLowerCase() + '/back/';
	  let pathFront = pathPlugin + className.toLowerCase() + '/front/';
	  try{
			this.back = require(pathBack);

			this.loadDependencies();
	  }
	  catch (e){
	    warning(className, 'Cannot find module:', pathBack, '\n', e, '\n');
	  }

	  try{
			this.front = require(pathFront);
	  }
	  catch (e){
	    warning(className, 'Cannot find module:', pathFront, '\n', e, '\n');
	  }
		this.emit('load');
	}

	loadDependencies(){
		this.back.routes.api.forEach((apiRoute, indexRouteApi) => {
			apiRoute.forEach((route, indexRoute) => {
				let dep = {};
				// search dependencies
				if(route.depPlugin){
					route.depPlugin.forEach((el, indexDep) => {
						dep[el] = this[el];
					});
				}

				// attach route with dependencies
				this.back.routes.api[indexRouteApi][indexRoute].depPlugin = dep;
			});
    });
	}

	remove(){
		this.event = {};
	}

  setConfig(conf){
    if(typeof conf === 'object'){
      let path = pathPlugin + plugin.props.conf.name + pathConfig;
      fs.writeFile(path, 'module.exports = ' + JSON.stringify(conf) + ';', 'utf8', (err) => {
        if(err){
          error(plugin.props.conf.name, 'Impossible to write:', path);
        }
        else{
          success(plugin.props.conf.name, 'Write file:', path);
          this.config = conf;
        }
        this.emit('config', err);
      });
    }
    else{
      error(plugin.props.conf.name, 'the param should be an object');
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
