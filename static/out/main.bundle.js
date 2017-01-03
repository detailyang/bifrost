webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _panel = __webpack_require__(159);

	var _panel2 = _interopRequireDefault(_panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(_panel2.default, null), document.getElementById('container'));

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(160);

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(164);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	var _list_area = __webpack_require__(340);

	var _list_area2 = _interopRequireDefault(_list_area);

	var _request_tab = __webpack_require__(341);

	var _request_tab2 = _interopRequireDefault(_request_tab);

	var _apply_dialog = __webpack_require__(342);

	var _apply_dialog2 = _interopRequireDefault(_apply_dialog);

	__webpack_require__(343);

	var _reactTapEventPlugin = __webpack_require__(344);

	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

	var _themes = __webpack_require__(348);

	var _themes2 = _interopRequireDefault(_themes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ThemeManager = __webpack_require__(209);

	(0, _reactTapEventPlugin2.default)();

	exports.default = _react2.default.createClass({
	  displayName: 'panel',
	  getInitialState: function getInitialState() {
	    return {
	      selectUser: null,
	      showDialog: false
	    };
	  },

	  childContextTypes: {
	    muiTheme: _react2.default.PropTypes.object
	  },

	  getChildContext: function getChildContext() {
	    return {
	      muiTheme: ThemeManager.getMuiTheme(_themes2.default)
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_materialUi.AppBar, { title: 'Bifrost', iconElementRight: _react2.default.createElement(_materialUi.FlatButton, { label: 'Apply', onTouchTap: this.openApplyDialog }) }),
	      _react2.default.createElement(
	        'div',
	        { style: styles.content },
	        _react2.default.createElement(
	          'div',
	          { style: styles.listWrap },
	          _react2.default.createElement(_list_area2.default, { onSelectUser: this.onSelectUser })
	        ),
	        this.state.selectUser ? _react2.default.createElement(
	          'div',
	          { style: styles.sideWrap },
	          _react2.default.createElement(_request_tab2.default, { username: this.state.selectUser })
	        ) : null
	      ),
	      _react2.default.createElement(_apply_dialog2.default, { showDialog: this.state.showDialog, closeApplyDialog: this.closeApplyDialog })
	    );
	  },
	  onSelectUser: function onSelectUser(user) {
	    this.setState({
	      selectUser: user
	    });
	  },
	  openApplyDialog: function openApplyDialog() {
	    this.setState({ showDialog: true });
	  },
	  closeApplyDialog: function closeApplyDialog(isButton) {
	    isButton && this.setState({ showDialog: false });
	  }
	});

	var styles = {
	  listWrap: {
	    width: '260px'
	  },
	  sideWrap: {
	    flex: 1,
	    padding: '20px'
	  },
	  content: {
	    display: 'flex',
	    padding: '10px'
	  }
	};

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(164);

	var _selectableEnhance = __webpack_require__(312);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectableList = (0, _selectableEnhance.SelectableContainerEnhance)(_materialUi.List);

	var ListArea = (function (_Component) {
	  _inherits(ListArea, _Component);

	  function ListArea(props) {
	    _classCallCheck(this, ListArea);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListArea).call(this, props));

	    _this.state = {
	      items: [],
	      selectedIndex: null,
	      loading: false
	    };
	    return _this;
	  }

	  _createClass(ListArea, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      this.setState({
	        loading: true
	      });
	      fetch('/7layer').then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        _this2.setState({
	          items: data,
	          loading: false
	        });
	      }).catch(function (ex) {
	        console.error('parsing failed', ex);
	        _this2.setState({
	          loading: false
	        });
	      });
	    }
	  }, {
	    key: 'handleUpdateSelectedIndex',
	    value: function handleUpdateSelectedIndex(e, index) {
	      this.setState({ selectedIndex: index });
	      this.props.onSelectUser(this.state.items[index - 1]);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var listItems = this.state.loading ? _react2.default.createElement(_materialUi.ListItem, { primaryText: 'loading' }) : this.state.items.map(function (item, index) {
	        return _react2.default.createElement(_materialUi.ListItem, { primaryText: item, key: index, value: index + 1 });
	      });
	      return _react2.default.createElement(
	        SelectableList,
	        { subheader: 'All Requests',
	          valueLink: { value: this.state.selectedIndex,
	            requestChange: this.handleUpdateSelectedIndex.bind(this) } },
	        listItems
	      );
	    }
	  }]);

	  return ListArea;
	})(_react.Component);

	exports.default = ListArea;

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(164);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RequestTab = (function (_Component) {
	  _inherits(RequestTab, _Component);

	  function RequestTab(props) {
	    _classCallCheck(this, RequestTab);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RequestTab).call(this, props));

	    _this.state = {
	      currentTab: 'request',
	      tabsContent: {}
	    };

	    _this.tabs = ['request', 'request body', 'response', 'response body'];
	    return _this;
	  }

	  _createClass(RequestTab, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.handleTabActive(this.state.currentTab);
	    }
	  }, {
	    key: 'handleTabsChange',
	    value: function handleTabsChange(value) {
	      this.setState({
	        currentTab: value
	      });
	    }
	  }, {
	    key: 'handleTabActive',
	    value: function handleTabActive(tabKey) {
	      var _this2 = this;

	      var key = tabKey.replace(/\s/g, '-');
	      fetch('/7layer/' + this.props.username + '/' + key).then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        var tabsContent = _this2.state.tabsContent;
	        tabsContent[tabKey] = JSON.stringify(data);
	        _this2.setState({ tabsContent: tabsContent });
	      }).catch(function (ex) {
	        console.error('parsing failed', ex);
	        tabsContent[tabKey] = '返回错误数据';
	        _this2.setState({ tabsContent: tabsContent });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var tabs = this.tabs.map(function (item, index) {
	        return _react2.default.createElement(
	          _materialUi.Tab,
	          { label: item, key: index, value: item,
	            onActive: _this3.handleTabActive.bind(_this3, item) },
	          _react2.default.createElement(
	            'div',
	            { style: styles.tabContent },
	            _this3.state.tabsContent[item]
	          )
	        );
	      });
	      return _react2.default.createElement(
	        _materialUi.Tabs,
	        { inkBarStyle: { backgroundColor: "#fff59d" },
	          valueLink: { value: this.state.currentTab, requestChange: this.handleTabsChange.bind(this) } },
	        tabs
	      );
	    }
	  }]);

	  return RequestTab;
	})(_react.Component);

	exports.default = RequestTab;

	var styles = {
	  tabContent: {
	    padding: '20px'
	  }
	};

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(164);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApplyDialog = (function (_Component) {
	  _inherits(ApplyDialog, _Component);

	  function ApplyDialog(props) {
	    _classCallCheck(this, ApplyDialog);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplyDialog).call(this, props));

	    _this.state = {
	      duration: 'day',
	      username: '',
	      token: null
	    };
	    return _this;
	  }

	  _createClass(ApplyDialog, [{
	    key: 'render',
	    value: function render() {
	      var standardActions = [{ text: 'Exit' }, { text: 'Apply',
	        onTouchTap: this.onDialogSubmit.bind(this),
	        ref: 'submit'
	      }];
	      return _react2.default.createElement(
	        _materialUi.Dialog,
	        {
	          title: '申请 Token',
	          actions: standardActions,
	          actionFocus: 'submit',
	          open: this.props.showDialog,
	          onRequestClose: this.props.closeApplyDialog },
	        _react2.default.createElement(_materialUi.TextField, { hintText: 'username', floatingLabelText: '用户名', value: this.state.username, onChange: this.onUsernameChange.bind(this) }),
	        _react2.default.createElement(
	          _materialUi.RadioButtonGroup,
	          { name: 'duration', valueSelected: this.state.duration, style: styles.radioGroup, onChange: this.onDurationChange.bind(this) },
	          _react2.default.createElement(_materialUi.RadioButton, {
	            value: 'day',
	            label: '一天',
	            style: styles.radio }),
	          _react2.default.createElement(_materialUi.RadioButton, {
	            value: 'week',
	            label: '一星期',
	            style: styles.radio }),
	          _react2.default.createElement(_materialUi.RadioButton, {
	            value: 'month',
	            label: '一个月',
	            style: styles.radio })
	        ),
	        this.state.token ? _react2.default.createElement(_materialUi.TextField, { hintText: 'token', floatingLabelText: 'Token',
	          disabled: false, rowsMax: 3, value: this.state.token,
	          style: styles.tokenField }) : null
	      );
	    }
	  }, {
	    key: 'onDurationChange',
	    value: function onDurationChange(e, selected) {
	      this.setState({
	        duration: selected
	      });
	    }
	  }, {
	    key: 'onDialogSubmit',
	    value: function onDialogSubmit() {
	      var _this2 = this;

	      var ttlMap = {
	        day: 24 * 3600,
	        week: 24 * 3600 * 7,
	        month: 24 * 3600 * 30
	      };
	      var data = {
	        ttl: ttlMap[this.state.duration],
	        user: this.state.username
	      };
	      fetch('/token', {
	        method: 'post',
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      }).then(function (res) {
	        return res.json();
	      }).then(function (data) {
	        _this2.setState({
	          token: data.value
	        });
	      }).catch(function (ex) {
	        console.error('parsing failed', ex);
	      });
	    }
	  }, {
	    key: 'onUsernameChange',
	    value: function onUsernameChange(e) {
	      this.setState({
	        username: e.target.value
	      });
	    }
	  }]);

	  return ApplyDialog;
	})(_react.Component);

	exports.default = ApplyDialog;

	var styles = {
	  radioGroup: {
	    marginTop: '25px'
	  },
	  radio: {
	    marginBottom: '16px'
	  },

	  tokenField: {
	    width: '400px',
	    fontSize: '24px'
	  }
	};

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Colors = __webpack_require__(185);
	var ColorManipulator = __webpack_require__(207);
	var Spacing = __webpack_require__(208);

	module.exports = {
	  spacing: Spacing,
	  fontFamily: 'Roboto, sans-serif',
	  palette: {
	    primary1Color: Colors.purple500,
	    primary2Color: Colors.purple700,
	    primary3Color: Colors.lightBlack,
	    accent1Color: Colors.pinkA200,
	    accent2Color: Colors.grey100,
	    accent3Color: Colors.grey500,
	    textColor: Colors.darkBlack,
	    alternateTextColor: Colors.white,
	    canvasColor: Colors.white,
	    borderColor: Colors.grey300,
	    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
	  }
	};

/***/ }

});