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
								_react2.default.createElement(_input2.default, { name: 'name', id: 'name', ref: 'name', type: 'text', placeholder: 'Name' }),
								_react2.default.createElement('br', null),
								_react2.default.createElement(_input2.default, { name: 'password', id: 'password', ref: 'password', type: 'password', placeholder: 'Password' }),
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

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Input = undefined;

	var _identifiers = __webpack_require__(263);

	var _reactCssThemr = __webpack_require__(259);

	var _Input = __webpack_require__(288);

	var _FontIcon = __webpack_require__(271);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	var _theme = __webpack_require__(289);

	var _theme2 = _interopRequireDefault(_theme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Input = (0, _Input.inputFactory)(_FontIcon2.default);
	var ThemedInput = (0, _reactCssThemr.themr)(_identifiers.INPUT, _theme2.default)(Input);

	exports.default = ThemedInput;
	exports.Input = ThemedInput;

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Input = exports.inputFactory = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames4 = __webpack_require__(265);

	var _classnames5 = _interopRequireDefault(_classnames4);

	var _reactCssThemr = __webpack_require__(259);

	var _identifiers = __webpack_require__(263);

	var _FontIcon = __webpack_require__(271);

	var _FontIcon2 = _interopRequireDefault(_FontIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var factory = function factory(FontIcon) {
	  var Input = function (_React$Component) {
	    _inherits(Input, _React$Component);

	    function Input() {
	      var _Object$getPrototypeO;

	      var _temp, _this, _ret;

	      _classCallCheck(this, Input);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
	        if (_this.props.multiline) {
	          _this.handleAutoresize();
	        }
	        if (_this.props.onChange) _this.props.onChange(event.target.value, event);
	      }, _this.handleAutoresize = function () {
	        var element = _this.refs.input;
	        // compute the height difference between inner height and outer height
	        var style = getComputedStyle(element, null);
	        var heightOffset = style.boxSizing === 'content-box' ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)) : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

	        // resize the input to its content size
	        element.style.height = 'auto';
	        element.style.height = element.scrollHeight + heightOffset + 'px';
	      }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Input, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        window.addEventListener('resize', this.handleAutoresize);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (!this.props.multiline && nextProps.multiline) {
	          window.addEventListener('resize', this.handleAutoresize);
	        } else if (this.props.multiline && !nextProps.multiline) {
	          window.removeEventListener('resize', this.handleAutoresize);
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        window.removeEventListener('resize', this.handleAutoresize);
	      }
	    }, {
	      key: 'blur',
	      value: function blur() {
	        this.refs.input.blur();
	      }
	    }, {
	      key: 'focus',
	      value: function focus() {
	        this.refs.input.focus();
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _classnames2;

	        var _props = this.props;
	        var children = _props.children;
	        var disabled = _props.disabled;
	        var error = _props.error;
	        var floating = _props.floating;
	        var hint = _props.hint;
	        var icon = _props.icon;
	        var name = _props.name;
	        var labelText = _props.label;
	        var maxLength = _props.maxLength;
	        var multiline = _props.multiline;
	        var required = _props.required;
	        var theme = _props.theme;
	        var type = _props.type;
	        var value = _props.value;

	        var others = _objectWithoutProperties(_props, ['children', 'disabled', 'error', 'floating', 'hint', 'icon', 'name', 'label', 'maxLength', 'multiline', 'required', 'theme', 'type', 'value']);

	        var length = maxLength && value ? value.length : 0;
	        var labelClassName = (0, _classnames5.default)(theme.label, _defineProperty({}, theme.fixed, !floating));

	        var className = (0, _classnames5.default)(theme.input, (_classnames2 = {}, _defineProperty(_classnames2, theme.disabled, disabled), _defineProperty(_classnames2, theme.errored, error), _defineProperty(_classnames2, theme.hidden, type === 'hidden'), _defineProperty(_classnames2, theme.withIcon, icon), _classnames2), this.props.className);

	        var valuePresent = value !== null && value !== undefined && value !== '' && !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === Number && isNaN(value));

	        var InputElement = _react2.default.createElement(multiline ? 'textarea' : 'input', _extends({}, others, {
	          className: (0, _classnames5.default)(theme.inputElement, _defineProperty({}, theme.filled, valuePresent)),
	          onChange: this.handleChange,
	          ref: 'input',
	          role: 'input',
	          name: name,
	          disabled: disabled,
	          required: required,
	          type: type,
	          value: value,
	          maxLength: maxLength
	        }));

	        return _react2.default.createElement(
	          'div',
	          { 'data-react-toolbox': 'input', className: className },
	          InputElement,
	          icon ? _react2.default.createElement(FontIcon, { className: theme.icon, value: icon }) : null,
	          _react2.default.createElement('span', { className: theme.bar }),
	          labelText ? _react2.default.createElement(
	            'label',
	            { className: labelClassName },
	            labelText,
	            required ? _react2.default.createElement(
	              'span',
	              { className: theme.required },
	              ' * '
	            ) : null
	          ) : null,
	          hint ? _react2.default.createElement(
	            'span',
	            { className: theme.hint },
	            hint
	          ) : null,
	          error ? _react2.default.createElement(
	            'span',
	            { className: theme.error },
	            error
	          ) : null,
	          maxLength ? _react2.default.createElement(
	            'span',
	            { className: theme.counter },
	            length,
	            '/',
	            maxLength
	          ) : null,
	          children
	        );
	      }
	    }]);

	    return Input;
	  }(_react2.default.Component);

	  Input.propTypes = {
	    children: _react2.default.PropTypes.any,
	    className: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    error: _react2.default.PropTypes.string,
	    floating: _react2.default.PropTypes.bool,
	    hint: _react2.default.PropTypes.string,
	    icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	    label: _react2.default.PropTypes.string,
	    maxLength: _react2.default.PropTypes.number,
	    multiline: _react2.default.PropTypes.bool,
	    name: _react2.default.PropTypes.string,
	    onBlur: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func,
	    onFocus: _react2.default.PropTypes.func,
	    onKeyPress: _react2.default.PropTypes.func,
	    required: _react2.default.PropTypes.bool,
	    theme: _react2.default.PropTypes.shape({
	      bar: _react2.default.PropTypes.string,
	      counter: _react2.default.PropTypes.string,
	      disabled: _react2.default.PropTypes.string,
	      error: _react2.default.PropTypes.string,
	      errored: _react2.default.PropTypes.string,
	      hidden: _react2.default.PropTypes.string,
	      hint: _react2.default.PropTypes.string,
	      icon: _react2.default.PropTypes.string,
	      input: _react2.default.PropTypes.string,
	      inputElement: _react2.default.PropTypes.string,
	      required: _react2.default.PropTypes.string,
	      withIcon: _react2.default.PropTypes.string
	    }),
	    type: _react2.default.PropTypes.string,
	    value: _react2.default.PropTypes.any
	  };
	  Input.defaultProps = {
	    className: '',
	    hint: '',
	    disabled: false,
	    floating: true,
	    multiline: false,
	    required: false,
	    type: 'text'
	  };


	  return Input;
	};

	var Input = factory(_FontIcon2.default);
	exports.default = (0, _reactCssThemr.themr)(_identifiers.INPUT)(Input);
	exports.inputFactory = factory;
	exports.Input = Input;

/***/ },

/***/ 289:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"input":"theme__input___qUQeP","withIcon":"theme__withIcon___f6YT1","icon":"theme__icon___1_C6Z","inputElement":"theme__inputElement___27dyY","bar":"theme__bar___2GHeb","label":"theme__label___tqKDt","fixed":"theme__fixed___2pXa4","required":"theme__required___2OgFq","hint":"theme__hint___2D9g-","filled":"theme__filled___1UI7Z","error":"theme__error___3ilni","counter":"theme__counter___398RE","disabled":"theme__disabled___6VTPW","errored":"theme__errored___3peD4","hidden":"theme__hidden___3lRxh"};

/***/ }

})