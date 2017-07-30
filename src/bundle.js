/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _character = __webpack_require__(7);

var _character2 = _interopRequireDefault(_character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _game2.default();
  game.registerGameObject(new _character2.default(game));
  game.start();
});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game_object = __webpack_require__(4);

var _game_object2 = _interopRequireDefault(_game_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    var _this = this;

    _classCallCheck(this, _class);

    this.options = Object.assign(this, {
      canvas: null,
      context: null,
      frameRate: 60,
      backgroundColor: 'white'
    }, options);

    // Get body reference
    this.body = document.getElementsByTagName('body')[0];

    // Get or create canvas
    if (!this.canvas) {
      this.canvas = document.getElementsByTagName('canvas')[0];
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
      }
      this.body.appendChild(this.canvas);
    }

    if (!this.context) {
      this.context = this.canvas.getContext('2d');
    }

    // Set focus to canvas
    this.canvas.focus();

    // Set up game and object actions
    this.game_actions = [];
    this.objects = new Set();
    this.object_actions = ['update', 'draw'];

    // Action for keeping track of viewport size
    this.game_actions.push(function () {
      _this.width = innerWidth;
      _this.height = innerHeight;
    });

    this.game_actions.push(function () {
      _this.canvas.width = _this.width;
      _this.canvas.height = _this.height;
    });

    // Action for clearing background
    this.game_actions.push(function () {
      _this.context.fillStyle = _this.backgroundColor;
      _this.context.fillRect(0, 0, _this.width, _this.height);
    });

    // Set up key status tracking
    this.downkeys = new Set();
    this.body.addEventListener('keydown', function (event) {
      _this.downkeys.add(event.keyCode);
    });
    this.body.addEventListener('keyup', function (event) {
      _this.downkeys.delete(event.keyCode);
    });
  }

  _createClass(_class, [{
    key: 'registerGameObject',
    value: function registerGameObject(go) {
      this.objects.add(go);
    }
  }, {
    key: 'unregisterGameObject',
    value: function unregisterGameObject(go) {
      this.object.delete(go);
    }
  }, {
    key: 'dispatchGameActions',
    value: function dispatchGameActions() {
      this.game_actions.forEach(function (action) {
        return action();
      });
    }
  }, {
    key: 'dispatchObjectActions',
    value: function dispatchObjectActions() {
      var _this2 = this;

      this.object_actions.forEach(function (action) {
        _this2.objects.forEach(function (object) {
          return object[action]();
        });
      });
    }
  }, {
    key: 'start',
    value: function start(frameRate) {
      var _this3 = this;

      this.loop = setInterval(function () {
        _this3.dispatchGameActions();
        _this3.dispatchObjectActions();
      }, 1000 / (frameRate || this.frameRate));
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.object_actions.pop();
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this.object_actions.push('draw');
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pair = __webpack_require__(5);

var _pair2 = _interopRequireDefault(_pair);

var _triple = __webpack_require__(6);

var _triple2 = _interopRequireDefault(_triple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(game, options) {
    _classCallCheck(this, _class);

    this.game = game;
    this.context = game.context;

    Object.assign(this, {
      position: new _triple2.default(),
      size: new _pair2.default(1, 1),
      speed: 1,
      color: 'black'
    }, options);
  }

  _createClass(_class, [{
    key: 'register',
    value: function register() {
      this.game.registerGameObject(this);
    }
  }, {
    key: 'unregister',
    value: function unregister() {
      this.game.unregisterGameObject(this);
    }
  }, {
    key: 'update',
    value: function update() {
      this.position.update();
      this.size.update();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _context;

      this.context.fillStyle = this.color;
      (_context = this.context).fillRect.apply(_context, _toConsumableArray(this.position.xy).concat(_toConsumableArray(this.size.pair)));
    }
  }, {
    key: 'move',
    value: function move() {
      for (var _len = arguments.length, offset = Array(_len), _key = 0; _key < _len; _key++) {
        offset[_key] = arguments[_key];
      }

      this.position = this.position.offset(new (Function.prototype.bind.apply(_triple2.default, [null].concat(offset)))());
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pair = function () {
  function Pair() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Pair);

    this.x = x;
    this.y = y;

    this.update();
  }

  _createClass(Pair, [{
    key: "update",
    value: function update() {
      this.pair = [this.x, this.y];
    }
  }, {
    key: "distance",
    value: function distance(other) {
      return Math.sqrt(this.pair.map(function (thisDim, index) {
        return Math.pow(thisDim - other.pair[index]);
      }).reduce(function (sum, value) {
        return sum + value;
      }));
    }
  }, {
    key: "offset",
    value: function offset(other) {
      return new (Function.prototype.bind.apply(Pair, [null].concat(_toConsumableArray(this.pair.map(function (thisDim, index) {
        return thisDim + other.pair[index];
      })))))();
    }
  }]);

  return Pair;
}();

exports.default = Pair;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triple = function () {
  function Triple() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Triple);

    this.x = x;
    this.y = y;
    this.z = z;

    this.update();
  }

  _createClass(Triple, [{
    key: "update",
    value: function update() {
      this.triple = [this.x, this.y, this.x];
      this.xy = [this.x, this.y];
    }
  }, {
    key: "distance",
    value: function distance(other) {
      return Math.sqrt(this.triple.map(function (thisDim, index) {
        return Math.pow(thisDim - other.triple[index]);
      }).reduce(function (sum, value) {
        return sum + value;
      }));
    }
  }, {
    key: "offset",
    value: function offset(other) {
      return new (Function.prototype.bind.apply(Triple, [null].concat(_toConsumableArray(this.triple.map(function (thisDim, index) {
        return thisDim + other.triple[index];
      })))))();
    }
  }]);

  return Triple;
}();

exports.default = Triple;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _pair = __webpack_require__(5);

var _pair2 = _interopRequireDefault(_pair);

var _game_object = __webpack_require__(4);

var _game_object2 = _interopRequireDefault(_game_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_GameObject) {
  _inherits(_class, _GameObject);

  function _class() {
    var _ref;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

    _this.color = 'blue';
    _this.size = new _pair2.default(20, 20);
    return _this;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.move.apply(this, _toConsumableArray([[87, [0, -1]], [65, [-1, 0]], [83, [0, 1]], [68, [1, 0]]].filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            key = _ref3[0];

        return _this2.game.downkeys.has(key);
      }).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            _ = _ref5[0],
            delta = _ref5[1];

        return delta;
      }).concat([[0, 0]]).reduce(function (deltaSum, delta) {
        return deltaSum.map(function (deltaEl, idx) {
          return deltaEl + delta[idx];
        });
      }).map(function (deltaEl) {
        return deltaEl * _this2.speed;
      })));

      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);
    }
  }]);

  return _class;
}(_game_object2.default);

exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map