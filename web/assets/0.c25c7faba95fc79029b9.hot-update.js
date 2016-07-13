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

	var _App = __webpack_require__(236);

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

/***/ },

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

	var _layout = __webpack_require__(257);

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
					_layout.Layout,
					null,
					_react2.default.createElement(
						NavDrawer,
						{ active: this.state.drawerActive,
							pinned: this.state.drawerPinned, permanentAt: 'xxxl',
							onOverlayClick: this.toggleDrawerActive },
						_react2.default.createElement(
							'p',
							null,
							'Navigation, account switcher, etc. go here.'
						)
					),
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

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(238);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navigation = function (_Component) {
		_inherits(Navigation, _Component);

		function Navigation() {
			_classCallCheck(this, Navigation);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).apply(this, arguments));
		}

		_createClass(Navigation, [{
			key: 'logout',
			value: function logout() {
				_axios2.default.get('/user/logout').then(function (response) {
					this.context.auth(false);
					this.context.router.push('/user/login');
				}.bind(this)).catch(function (error) {
					console.log(error);
					if (error.data.errors.redirect) {
						this.context.router.push('/user/login');
					}
				}.bind(this));
			}
		}, {
			key: 'render',
			value: function render() {
				var rendu = null;

				if (this.context.auth()) {
					rendu = _react2.default.createElement(
						'nav',
						null,
						_react2.default.createElement(
							'ul',
							null,
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									_reactRouter.IndexLink,
									{ to: '/', activeClassName: 'active' },
									'Home'
								)
							),
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/video', activeClassName: 'active' },
									'Video'
								)
							),
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/config', activeClassName: 'active' },
									'Config'
								)
							),
							_react2.default.createElement(
								'li',
								null,
								_react2.default.createElement(
									'a',
									{ onClick: this.logout.bind(this) },
									'Log out'
								)
							)
						)
					);
				}

				return rendu;
			}
		}]);

		return Navigation;
	}(_react.Component);

	Navigation.contextTypes = {
		router: _react2.default.PropTypes.object.isRequired,
		auth: _react2.default.PropTypes.func
	};

	exports.default = Navigation;

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sidebar = exports.NavDrawer = exports.Panel = exports.Layout = undefined;

	var _reactCssThemr = __webpack_require__(258);

	var _identifiers = __webpack_require__(262);

	var _Layout = __webpack_require__(263);

	var _Panel = __webpack_require__(265);

	var _NavDrawer = __webpack_require__(266);

	var _Sidebar = __webpack_require__(267);

	var _theme = __webpack_require__(268);

	var _theme2 = _interopRequireDefault(_theme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ThemedLayout = (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default)(_Layout.Layout);
	var ThemedPanel = (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default)(_Panel.Panel);
	var ThemedNavDrawer = (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default)(_NavDrawer.NavDrawer);
	var ThemedSidebar = (0, _reactCssThemr.themr)(_identifiers.LAYOUT, _theme2.default)(_Sidebar.Sidebar);

	exports.Layout = ThemedLayout;
	exports.Panel = ThemedPanel;
	exports.NavDrawer = ThemedNavDrawer;
	exports.Sidebar = ThemedSidebar;

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Layout = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactCssThemr = __webpack_require__(258);

	var _classnames = __webpack_require__(264);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _identifiers = __webpack_require__(262);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Layout = function Layout(_ref) {
	  var className = _ref.className;
	  var children = _ref.children;
	  var theme = _ref.theme;
	  return _react2.default.createElement(
	    'div',
	    { 'data-react-toolbox': 'layout', className: (0, _classnames2.default)(theme.layout, className) },
	    children
	  );
	};

	var ALLOWED_THEMED = ['Themed Panel', 'Themed NavDrawer|Themed Panel', 'Themed NavDrawer|Themed Panel|Themed Sidebar', 'Themed Panel|Themed Sidebar'];

	function getChildName(child) {
	  if (child.type) {
	    return child.type.displayName || child.type.name || child.type;
	  }
	  if (!child.constructor || !child.constructor.name) {
	    return 'UNKNOWN';
	  }
	  return child.constructor.name;
	}

	Layout.propTypes = {
	  children: function children(props, propName, componentName) {
	    // Accept only [NavDrawer]Pane[Sidebar]
	    var children = props[propName];
	    if (_react2.default.Children.count(children) > 3) {
	      return new Error('`' + componentName + '` ' + 'should have a Pane for a child, optionally preceded and/or followed by a Drawer.');
	    }

	    var names = _react2.default.Children.map(children, getChildName).join('|');
	    if (! ~ALLOWED_THEMED.indexOf(names)) {
	      return new Error('`' + componentName + '` ' + 'should have a Panel for a child, optionally preceded by a NavDrawer and/or followed by a Sidebar.');
	    }
	  },

	  className: _react.PropTypes.string,
	  theme: _react.PropTypes.shape({
	    layout: _react.PropTypes.string
	  })
	};

	Layout.defaultProps = {
	  className: ''
	};

	exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Layout);
	exports.Layout = Layout;

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Panel = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(264);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _reactCssThemr = __webpack_require__(258);

	var _identifiers = __webpack_require__(262);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Panel = function Panel(_ref) {
	  var children = _ref.children;
	  var className = _ref.className;
	  var scrollY = _ref.scrollY;
	  var theme = _ref.theme;

	  var _className = (0, _classnames3.default)(theme.panel, _defineProperty({}, theme.scrollY, scrollY), className);

	  return _react2.default.createElement(
	    'div',
	    { 'data-react-toolbox': 'panel', className: _className },
	    children
	  );
	};

	Panel.propTypes = {
	  children: _react.PropTypes.any,
	  className: _react.PropTypes.string,
	  scrollY: _react.PropTypes.bool,
	  theme: _react.PropTypes.shape({
	    panel: _react.PropTypes.string,
	    scrollY: _react.PropTypes.string
	  })
	};

	Panel.defaultProps = {
	  className: '',
	  scrollY: false
	};

	exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Panel);
	exports.Panel = Panel;

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NavDrawer = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames3 = __webpack_require__(264);

	var _classnames4 = _interopRequireDefault(_classnames3);

	var _reactCssThemr = __webpack_require__(258);

	var _identifiers = __webpack_require__(262);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var NavDrawer = function NavDrawer(_ref) {
	  var _classnames;

	  var active = _ref.active;
	  var children = _ref.children;
	  var className = _ref.className;
	  var onOverlayClick = _ref.onOverlayClick;
	  var permanentAt = _ref.permanentAt;
	  var pinned = _ref.pinned;
	  var scrollY = _ref.scrollY;
	  var theme = _ref.theme;
	  var width = _ref.width;

	  var rootClasses = (0, _classnames4.default)([theme.navDrawer], (_classnames = {}, _defineProperty(_classnames, theme[permanentAt + 'Permanent'], permanentAt), _defineProperty(_classnames, theme.wide, width === 'wide'), _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.pinned, pinned), _classnames), className);

	  var drawerClasses = (0, _classnames4.default)(theme.drawerContent, _defineProperty({}, theme.scrollY, scrollY));

	  return _react2.default.createElement(
	    'div',
	    { 'data-react-toolbox': 'nav-drawer', className: rootClasses, onClick: onOverlayClick },
	    _react2.default.createElement(
	      'div',
	      { 'data-react-toolbox': 'nav-drawer-scrim', className: theme.scrim },
	      _react2.default.createElement(
	        'aside',
	        { 'data-react-toolbox': 'nav-drawer-content', className: drawerClasses },
	        children
	      )
	    )
	  );
	};

	NavDrawer.propTypes = {
	  active: _react.PropTypes.bool,
	  children: _react.PropTypes.any,
	  className: _react.PropTypes.string,
	  onOverlayClick: _react.PropTypes.func,
	  permanentAt: _react.PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
	  pinned: _react.PropTypes.bool,
	  scrollY: _react.PropTypes.bool,
	  theme: _react.PropTypes.shape({
	    active: _react.PropTypes.string,
	    drawerContent: _react.PropTypes.string,
	    lgPermanent: _react.PropTypes.string,
	    mdPermanent: _react.PropTypes.string,
	    navDrawer: _react.PropTypes.string,
	    pinned: _react.PropTypes.string,
	    scrim: _react.PropTypes.string,
	    scrollY: _react.PropTypes.string,
	    smPermanent: _react.PropTypes.string,
	    wide: _react.PropTypes.string,
	    xlPermanent: _react.PropTypes.string,
	    xxlPermanent: _react.PropTypes.string,
	    xxxlPermanent: _react.PropTypes.string
	  }),
	  width: _react.PropTypes.oneOf(['normal', 'wide'])
	};

	NavDrawer.defaultProps = {
	  active: false,
	  className: '',
	  scrollY: false,
	  width: 'normal'
	};

	exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(NavDrawer);
	exports.NavDrawer = NavDrawer;

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sidebar = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames3 = __webpack_require__(264);

	var _classnames4 = _interopRequireDefault(_classnames3);

	var _reactCssThemr = __webpack_require__(258);

	var _identifiers = __webpack_require__(262);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Sidebar = function Sidebar(_ref) {
	  var children = _ref.children;
	  var className = _ref.className;
	  var pinned = _ref.pinned;
	  var scrollY = _ref.scrollY;
	  var theme = _ref.theme;
	  var width = _ref.width;

	  var wrapperClasses = (0, _classnames4.default)(theme.sidebar, theme['width-' + width], _defineProperty({}, theme.pinned, pinned), className);

	  var innerClasses = (0, _classnames4.default)(theme.sidebarContent, _defineProperty({}, theme.scrollY, scrollY));

	  return _react2.default.createElement(
	    'div',
	    { 'data-react-toolbox': 'sidebar', className: wrapperClasses },
	    _react2.default.createElement(
	      'aside',
	      { 'data-react-toolbox': 'sidebar-content', className: innerClasses },
	      children
	    )
	  );
	};

	Sidebar.propTypes = {
	  children: _react.PropTypes.any,
	  className: _react.PropTypes.string,
	  pinned: _react.PropTypes.bool,
	  scrollY: _react.PropTypes.bool,
	  theme: _react.PropTypes.shape({
	    pinned: _react.PropTypes.string,
	    scrollY: _react.PropTypes.string,
	    sidebar: _react.PropTypes.string,
	    sidebarContent: _react.PropTypes.string
	  }),
	  width: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100])
	};

	Sidebar.defaultProps = {
	  className: '',
	  pinned: false,
	  scrollY: false,
	  width: 5
	};

	exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Sidebar);
	exports.Sidebar = Sidebar;

/***/ },

/***/ 268:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"layout":"theme__layout___2DIC_","navDrawer":"theme__navDrawer___1rdra","scrim":"theme__scrim___2QDhH","drawerContent":"theme__drawerContent___unz6w","scrollY":"theme__scrollY___1AG90","pinned":"theme__pinned___oVgJU","active":"theme__active___1P57z","wide":"theme__wide___3X5rC","smPermanent":"theme__smPermanent___1QkG3","mdPermanent":"theme__mdPermanent___3v_k7","lgPermanent":"theme__lgPermanent___3rQEf","xlPermanent":"theme__xlPermanent___3O4lD","xxlPermanent":"theme__xxlPermanent___yB-xN","xxxlPermanent":"theme__xxxlPermanent___2PMir","panel":"theme__panel___o2a2H","sidebar":"theme__sidebar___t1TKH","sidebarContent":"theme__sidebarContent___1MT-m","width-1":"theme__width-1___3dCDA","width-2":"theme__width-2___2OjoL","width-3":"theme__width-3___26_RL","width-4":"theme__width-4___kGxrf","width-5":"theme__width-5___3HyHQ","width-6":"theme__width-6___VWIJh","width-7":"theme__width-7___RMBsM","width-8":"theme__width-8___2p9V4","width-9":"theme__width-9___3JV_V","width-10":"theme__width-10___IFhjC","width-11":"theme__width-11___2gqr4","width-12":"theme__width-12___3Fqrn","width-100":"theme__width-100___cH-H3","width-25":"theme__width-25___2wWPw","width-33":"theme__width-33___1MMwi","width-50":"theme__width-50___gURY4","width-66":"theme__width-66___1TeEX","width-75":"theme__width-75___1smcb"};

/***/ }

})