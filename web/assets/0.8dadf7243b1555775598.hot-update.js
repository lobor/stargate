webpackHotUpdate(0,{

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	/*jshint esnext:true, browserify:true, unused:vars */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(238);

	var _axios2 = _interopRequireDefault(_axios);

	var _card = __webpack_require__(258);

	var _button = __webpack_require__(275);

	var _input = __webpack_require__(287);

	var _input2 = _interopRequireDefault(_input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_Component) {
		_inherits(Login, _Component);

		function Login() {
			var _Object$getPrototypeO;

			_classCallCheck(this, Login);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Login)).call.apply(_Object$getPrototypeO, [this].concat(args)));

			_this.state = { msg: false };
			return _this;
		}

		_createClass(Login, [{
			key: 'submit',
			value: function submit(e) {
				e.preventDefault();
				this.setState({ msg: false });
				_axios2.default.post('/user/login', {
					name: this.refs.name.value,
					password: this.refs.password.value
				}).then(function (response) {
					this.context.auth(true);
					this.context.router.push('/');
				}.bind(this)).catch(function (error) {
					this.setState({ msg: error.data.errors.message });
				}.bind(this));
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_card.Card,
					{ style: { width: '350px', margin: 'auto' } },
					_react2.default.createElement(_card.CardTitle, {
						title: 'Login',
						style: { "textAlign": "center" }
					}),
					_react2.default.createElement(
						_card.CardText,
						null,
						_react2.default.createElement(
							'form',
							{ method: 'POST', className: 'card__container bg-blue-light', onSubmit: this.submit.bind(this) },
							_react2.default.createElement(
								'div',
								{ className: 'card__body' },
								_react2.default.createElement(
									'div',
									{ className: 'error', style: this.state.msg ? {} : { 'display': 'none' } },
									this.state.msg
								),
								_react2.default.createElement(_input2.default, { name: 'name', id: 'name', ref: 'name', type: 'text', label: 'Name' }),
								_react2.default.createElement('br', null),
								_react2.default.createElement(_input2.default, { name: 'password', id: 'password', ref: 'password', type: 'password', label: 'Password' }),
								_react2.default.createElement('br', null),
								_react2.default.createElement(_button.Button, { type: 'submit', label: 'Login', primary: true })
							)
						)
					)
				);
			}
		}]);

		return Login;
	}(_react.Component);

	Login.contextTypes = {
		router: _react2.default.PropTypes.object.isRequired,
		auth: _react2.default.PropTypes.func
	};

	exports.default = Login;

/***/ }

})