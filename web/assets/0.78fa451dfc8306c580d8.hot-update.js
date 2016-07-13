webpackHotUpdate(0,{

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _testcomponent = __webpack_require__(235);

	var _testcomponent2 = _interopRequireDefault(_testcomponent);

	var _App = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./../components/App.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _App2 = _interopRequireDefault(_App);

	var _Login = __webpack_require__(269);

	var _Login2 = _interopRequireDefault(_Login);

	var _Home = __webpack_require__(293);

	var _Home2 = _interopRequireDefault(_Home);

	var _Video = __webpack_require__(295);

	var _Video2 = _interopRequireDefault(_Video);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
		_reactRouter.Router,
		{ history: _reactRouter.browserHistory },
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/', component: _App2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default, auth: ['user'] }),
			_react2.default.createElement(_reactRouter.Route, { path: 'testComponent', auth: ['user'], component: _testcomponent2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'video', auth: ['user'], component: _Video2.default }),
			_react2.default.createElement(
				_reactRouter.Route,
				{ path: 'user/' },
				_react2.default.createElement(_reactRouter.Route, { path: 'login', auth: ['free'], component: _Login2.default })
			)
		)
	);

/***/ }

})