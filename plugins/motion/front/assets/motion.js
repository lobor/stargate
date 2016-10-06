/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _toolboxFront = __webpack_require__(1);

	var _routes = __webpack_require__(2);

	var _routes2 = _interopRequireDefault(_routes);

	var _navigation = __webpack_require__(304);

	var _navigation2 = _interopRequireDefault(_navigation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	(0, _toolboxFront.setNavigation)(_navigation2.default);
	(0, _toolboxFront.setRoutes)(_routes2.default);

/***/ },

/***/ 1:
/***/ function(module, exports) {

	"use strict";

	var app = window.App;

	function setNavigation(navigation) {
	  var navApp = app.state.navigation;
	  navApp = navApp.concat(navigation);
	  app.setState({ navigation: navApp });
	}

	function setRoutes(routes) {
	  var routesApp = app.state.routes;
	  routesApp = routesApp.concat(routes);
	  app.setState({ routes: routesApp });
	}

	module.exports = {
	  setNavigation: setNavigation,
	  setRoutes: setRoutes
	};

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Config = __webpack_require__(3);

	var _Config2 = _interopRequireDefault(_Config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		pattern: '/motion/config',
		component: _Config2.default,
		name: 'motion_config'
	};

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from 'react';
	// import {Tab, Tabs} from 'react-toolbox/lib/tabs';
	//


	var Config = function (_React$Component) {
		_inherits(Config, _React$Component);

		function Config() {
			_classCallCheck(this, Config);

			var _this = _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).call(this));

			_this.state = {
				webcam: {
					stream: false,
					connect: false,
					record: false,
					path: ''
				},
				tabActive: 0
			};

			_this.handleTabChange = _this.handleTabChange.bind(_this);
			return _this;
		}

		_createClass(Config, [{
			key: 'handleTabChange',
			value: function handleTabChange(index) {
				this.setState({ tabActive: index });
			}

			// render(){
			// 	return (
			//     <div></div>
			// 	);
			// }

		}, {
			key: 'render',
			value: function render() {
				return React.createElement(_config2.default, null);
			}
		}]);

		return Config;
	}(React.Component);

	exports.default = Config;

/***/ },

/***/ 4:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import React, { Component } from 'react';

	// import RaisedButton from 'material-ui/RaisedButton';

	// import Notify from './../../commons/notify';
	// require('react');
	// import { Button } from 'react-toolbox/lib/button';
	// import Input from 'react-toolbox/lib/input';
	// import { List, ListItem, ListSubHeader, Divider, ListCheckbox } from 'react-toolbox/lib/list';
	// import Switch from 'react-toolbox/lib/switch';
	// import FontIcon from 'react-toolbox/lib/font_icon';
	// import Dropdown from 'react-toolbox/lib/dropdown';
	//
	// import {Tab, Tabs} from 'react-toolbox/lib/tabs';

	var Config = function (_React$Component) {
	  _inherits(Config, _React$Component);

	  function Config() {
	    var _ref;

	    _classCallCheck(this, Config);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_ref = Config.__proto__ || Object.getPrototypeOf(Config)).call.apply(_ref, [this].concat(args)));

	    _this.state = {
	      webcam: [],
	      tabActive: 0
	    };

	    _this.handleTabChange = _this.handleTabChange.bind(_this);
	    return _this;
	  }

	  _createClass(Config, [{
	    key: 'handleTabChange',
	    value: function handleTabChange(index) {
	      this.setState({ tabActive: index });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      this.context.io.run('config:motion', {}, function (res) {
	        if (res) {
	          _this2.setState(res);
	        } else {
	          _this2.context.router.push('/user/login');
	        }
	      });
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(name, index, value) {
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	        var webcam = this.state.webcam;
	        webcam[index][name] = value;
	        this.setState({ webcam: webcam });
	      } else {
	        this.setState(_defineProperty({}, name, index));
	      }
	    }
	  }, {
	    key: 'submit',
	    value: function submit(index, e) {
	      if (!e) {
	        e = index;
	      }
	      e.preventDefault();
	      this.context.io.run('config:motion:post', this.state, function (res) {
	        // if(res.response){
	        //   this._notify.addNotify({
	        //     msg: 'Has been saved',
	        //     type: 'success'
	        //   });
	        // }
	        // else{
	        //   this._notify.addNotify({
	        //     msg: 'An error has been occured',
	        //     type: 'error'
	        //   });
	        // }
	      });
	    }

	    // render(){
	    //   return (
	    //     <div></div>
	    //   );
	    // }
	    // render(){
	    //   return (
	    //     <RaisedButton label="Save" primary />
	    //   );
	    // }

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      return React.createElement(
	        Ui.Tabs,
	        null,
	        React.createElement(
	          Ui.Tab,
	          { label: 'General' },
	          React.createElement(
	            'form',
	            { method: 'POST', className: 'card__container bg-blue-light', onSubmit: this.submit.bind(this) },
	            React.createElement(
	              Ui.List,
	              null,
	              React.createElement(Ui.Divider, null),
	              React.createElement(Ui.ListItem, {
	                primaryText: 'Record video',
	                secondaryText: 'Record on motion detection',
	                leftIcon: React.createElement(Ui.FontIcon, { className: 'fiber-manual-record' }),
	                rightToggle: React.createElement(Ui.Toggle, { key: 'record_video', toggled: this.state.record_video, onToggle: this.handleChange.bind(this, 'record_video') })
	              }),
	              React.createElement(Ui.Divider, null),
	              React.createElement(Ui.ListItem, {
	                primaryText: 'Record picture',
	                secondaryText: 'Record on motion detection',
	                leftIcon: React.createElement(Ui.FontIcon, { className: 'fiber-manual-record' }),
	                rightToggle: React.createElement(Ui.Toggle, { key: 'record_picture', toggled: this.state.record_picture, onToggle: this.handleChange.bind(this, 'record_picture') })
	              }),
	              React.createElement(Ui.Divider, null)
	            ),
	            React.createElement(Ui.RaisedButton, { type: 'submit', label: 'Save', primary: true })
	          )
	        ),
	        this.state.webcam.map(function (el, i) {
	          var name = 'Camera ' + (i + 1);
	          return React.createElement(
	            Ui.Tab,
	            { label: name, key: i + 1 },
	            React.createElement(
	              'form',
	              { method: 'POST', className: 'card__container bg-blue-light', onSubmit: _this3.submit.bind(_this3, i) },
	              React.createElement(
	                Ui.List,
	                null,
	                React.createElement(Ui.ListItem, {
	                  primaryText: 'Path where save file',
	                  leftIcon: React.createElement(Ui.FontIcon, { className: 'folder' }),
	                  secondaryText: React.createElement(Ui.TextField, { type: 'text', key: 'path', label: '/tmp/motion', onChange: _this3.handleChange.bind(_this3, 'target_dir', i), value: _this3.state.webcam[i].target_dir })
	                }),
	                React.createElement(Ui.Divider, null)
	              ),
	              React.createElement(Ui.RaisedButton, { type: 'submit', label: 'Save', primary: true })
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Config;
	}(React.Component);

	Config.contextTypes = {
	  io: window.React.PropTypes.object
	};

	exports.default = Config;

/***/ },

/***/ 304:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		"label": "Motion",
		"href": "/motion/config",
		"icon": "camera alt"
	};

/***/ }

/******/ });