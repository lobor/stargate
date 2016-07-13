webpackHotUpdate(0,{

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Navigation = __webpack_require__(237);

	var _Navigation2 = _interopRequireDefault(_Navigation);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
		_inherits(App, _Component);

		function App() {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
		}

		_createClass(App, [{
			key: 'getChildContext',
			value: function getChildContext() {
				var _auth = false;
				if ('/user/login' !== window.location.pathname) {
					_auth = true;
				} else if ('/user/login' === window.location.pathname) {
					_auth = false;
				}

				return {
					auth: function auth(val) {
						if (val) {
							_auth = val;
						}
						return _auth;
					}
				};
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					Layout,
					null,
					_react2.default.createElement(_Navigation2.default, null),
					_react2.default.createElement(
						'div',
						{ className: 'wrapper' },
						this.props.children
					)
				);
			}
		}]);

		return App;
	}(_react.Component);

	App.contextTypes = {
		router: _react2.default.PropTypes.object.isRequired
	};

	App.childContextTypes = {
		auth: _react2.default.PropTypes.func
	};

	exports.default = App;

/***/ }

})